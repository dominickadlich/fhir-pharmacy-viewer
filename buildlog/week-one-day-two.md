# Build Log — Week 1 day 2 | March 1, 2026

## What I Attempted
Today I tackled the OAuth 2.0 SMART on FHIR authentication flow. Specifically the full launch-to-callback sequence: initiating the Epic login, selecting a patient in the EHR context, and returning to the callback route with the patient's information injected by Epic.

## What Worked

app/launch/page.tsx

'use client'

import { useEffect } from "react";
import FHIR from "fhirclient";

export default function LaunchPage() {

    useEffect(() => {
        FHIR.oauth2.authorize({
         clientId: process.env.NEXT_PUBLIC_NON_PRODUCTION_CLIENT_ID!,
         redirectUri: "http://localhost:3000/api/auth/callback",
         scope: "launch/patient patient/Patient.rs patient/MedicationRequest.rs patient/AllergyIntolerance.rs patient/Observation.rs openid fhirUser",
         iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
       })
    }, []);

    return <div>Launching...</div>
}

app/api/auth/callback/page.tsx

'use client'

import { useEffect } from "react"
import FHIR from 'fhirclient'

export default function CallbackPage() {
    useEffect(() => {
        FHIR.oauth2.ready().then(client => {
            client.patient.read().then(data => {
                console.log("Patient data:", data)
            });
        });
    }, []);

    return <div>Completing authorization...</div>
}

## What broke / what confused me

Most of this debugging happened collaboratively — I was working through the SMART on FHIR flow with an AI mentor who helped me interpret Epic's error responses and identify the root causes. The lessons are real even if I didn't find them alone.

app/launch/page.tsx:

The first auth attempt failed immediately. I was passing my standard Client ID rather than the Non-Production Client ID — a distinction Epic makes in the developer portal that isn't obvious until you hit the error. After correcting that, auth was still failing, and I noticed the scope in the redirect URL was being stripped down to just launch/patient openid fhirUser. Everything else was silently dropped.

The root cause: Epic's developer portal defaults to SMART v1 scope syntax, but the .rs scope format I was using is SMART v2. Once I updated the app settings at fhir.epic.com/Developer/Apps to SMART v2, the full scope string passed correctly and the login page loaded as expected.

app/api/auth/callback/page.tsx

After confirming the fhirclient instance was initializing correctly, I updated the callback to pull patient data:
 
 FHIR.oauth2.ready().then(client => {
    client.request("Patient").then(data => {
        console.log("Patient data:", data)
    });
});

This returned a 403 Forbidden. The issue: client.request("Patient") attempts to query the Patient collection endpoint, effectively requesting access to all patients, which Epic correctly blocks. The fix was switching to client.patient.read(), which reads only the patient whose ID was injected into the launch context by Epic. That call succeeded, and I could see demographic data, such as, address, gender, marital status in the console.

## What I learned

The SMART on FHIR launch sequence has more surface area for failure than I expected, and most of the errors are silent or misleading. The two biggest lessons:

SMART v1 vs. v2 scope syntax matters. The .rs suffix is a SMART v2 convention: r for read, s for search. If your Epic app is configured for v1, those scopes get stripped at the authorization URL without an explicit error. Version mismatch is the first thing to check when scopes disappear.

client.request("Patient") and client.patient.read() are not interchangeable. The former is a broad resource query; the latter is scoped to the patient in context. In a SMART launch, Epic injects the patient ID into the authorization token — client.patient.read() uses that injection. This is the correct pattern for any patient-facing SMART app and the one we'll use throughout this project.

## Next Session's First Action

Fetch MedicationRequest and AllergyIntolerance resources using the authenticated client and log the raw response — confirm that the patient in context returns data for both resource types before building any parsing logic.

## LinkedIn Post

The SMART spec gives you a lot of rope, and Epic's implementation makes specific choices about how that rope is handled.

Been building a SMART on FHIR OAuth flow this week. Most of the debugging happened in conversation with an AI, which surfaced two things worth documenting publicly because they'll bite anyone building against Epic's sandbox.

First: Epic's developer App form defaults to SMART Scope v1. I was using .rs suffixes in my code, the SMART v2 format, and Epic was silently stripping everything except launch/patient openid fhirUser from the authorization URL. No error, just missing scopes. The fix was updating the app configuration to SMART v2. Not obvious unless you know to look for it.

Second: client.request("Patient") returns a 403 in a SMART launch context. It's querying the Patient resource broadly, which Epic correctly blocks. client.patient.read() is the right call. It reads the patient whose ID was injected by Epic during the launch handoff. Same resource, completely different authorization scope.