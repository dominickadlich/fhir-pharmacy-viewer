'use client'

import { useEffect, useRef, useState } from "react"
import PatientHeader from "@/app/components/PatientHeader"
import getPatientData from "@/app/lib/fhir"
import { parsePatient } from "@/app/lib/fhir/parsers"
import MedicationList from "@/app/components/MedicationList"
import AllergyList from "@/app/components/AllergyList"
import { findDrugAllergyConflicts } from "@/app/lib/utils"
import DrugAllergyFlag from "@/app/components/DrugAllergyFlag"

export default function CallbackPage() {
    const isReadyCalled = useRef(false)
    const [patientData, setPatientData] = useState<Awaited<ReturnType<typeof getPatientData>> | null>(null)
    const [conflicts, setConflicts] = useState<{drug: string, allergy: string}[]>([])

    useEffect(() => {
        if (isReadyCalled.current) return;
        isReadyCalled.current = true;

        getPatientData().then(data => {
            setPatientData(data)
            setConflicts(findDrugAllergyConflicts(data.medications, data.allergies))
        })
    }, []);

    if (!patientData) return <div>Loading...</div>

    return (
        <>
            <PatientHeader
                patient={parsePatient(patientData.patient)!}
                allergyCount={patientData.allergies.length}
                medicationCount={patientData.medications.length}
            />
            {conflicts.map((c, i) => (
                <DrugAllergyFlag key={i} drug={c.drug} allergy={c.allergy} />
            ))}
            <MedicationList medications={patientData.medications}/>
            <AllergyList allergies={patientData.allergies} />
        </>
    )
}