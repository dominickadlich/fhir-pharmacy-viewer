'use client'

import { useEffect } from "react";
import FHIR from "fhirclient";

export default function LaunchPage() {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
        }
        
        FHIR.oauth2.authorize({
         clientId: process.env.NEXT_PUBLIC_NON_PRODUCTION_CLIENT_ID!,
         redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
         scope: "launch/patient openid fhirUser patient/Patient.rs patient/MedicationRequest.rs patient/Medication.rs patient/AllergyIntolerance.rs patient/Observation.rs",
         iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
       })
    }, []);

    console.log("clientId:", process.env.NEXT_PUBLIC_NON_PRODUCTION_CLIENT_ID)
    console.log("redirectUri:", process.env.NEXT_PUBLIC_REDIRECT_URI)
    
    return <div>Launching...</div>
}