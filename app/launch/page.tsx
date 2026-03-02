'use client'

import { useEffect } from "react";
import FHIR from "fhirclient";

export default function LaunchPage() {

    useEffect(() => {
        FHIR.oauth2.authorize({
         clientId: process.env.NEXT_PUBLIC_NON_PRODUCTION_CLIENT_ID!,
         redirectUri: "http://localhost:3000/api/auth/callback",
         scope: "launch/patient openid fhirUser patient/Patient.read patient/MedicationRequest.read patient/AllergyIntolerance.read patient/Observation.read",
         iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
       })
    }, []);

    return <div>Launching...</div>
}