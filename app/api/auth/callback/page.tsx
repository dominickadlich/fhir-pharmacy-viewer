'use client'

import { useEffect } from "react"
import FHIR from 'fhirclient'

export default function CallbackPage() {
    useEffect(() => {
        FHIR.oauth2.ready().then(client => {
            console.log("Token response:", client.state.tokenResponse);
            console.log("Patient ID:", client.patient.id);

            client.patient.read().then(data => {
                console.log("Patient Data:", data)
            })

            client.request(`MedicationRequest?patient=${client.patient.id}`)
  .then(data => console.log(data))
  .catch(err => console.error("Search failed:", err));
        });
    }, []);

    return <div>Completing authorization...</div>
}