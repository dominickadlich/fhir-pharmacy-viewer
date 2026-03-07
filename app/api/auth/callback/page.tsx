'use client'

import { useEffect, useRef, useState } from "react"
import PatientHeader from "@/app/components/PatientHeader"
import getPatientData from "@/app/lib/fhir"
import { ParsedMedication, ParsedObservation, parsePatient } from "@/app/lib/fhir/parsers"
import MedicationList from "@/app/components/MedicationList"
import AllergyList from "@/app/components/AllergyList"
import { filterRenalDoseAntibiotics, filterRenalLabs, findDrugAllergyConflicts } from "@/app/lib/utils"
import DrugAllergyFlag from "@/app/components/DrugAllergyFlag"
import ObservationList from "@/app/components/ObservationList"
import RenalDosingPanel from "@/app/components/RenalDosingPanel"

export default function CallbackPage() {
    const isReadyCalled = useRef(false)
    const [patientData, setPatientData] = useState<Awaited<ReturnType<typeof getPatientData>> | null>(null)
    const [conflicts, setConflicts] = useState<{drug: string, allergy: string}[]>([])
    const [renalPanel, setRenalPanel] = useState<ParsedObservation[]>([]);
    const [renallyDosedAbx, setRenallyDosedAbx] = useState<string[]>([]);

    useEffect(() => {
        if (isReadyCalled.current) return;
        isReadyCalled.current = true;

        getPatientData().then(data => {
            setPatientData(data)
            console.log(data)
            setConflicts(findDrugAllergyConflicts(data.medications, data.allergies))
            // setRenallyDosedAbx(filterRenalDoseAntibiotics(data.medications))
            // setRenalPanel(filterRenalLabs(data.observations))
            setRenallyDosedAbx(["Vancomycin", "Daptomycin"])
            setRenalPanel([
                {
                    id: "mock-scr-001",
                    code: "2160-0",
                    text: "Serum Creatinine",
                    value: 2.1,
                    unit: "mg/dL",
                    referenceRange: "0.6 - 1.2 mg/dL",
                    effectiveDateTime: "2026-03-06T08:00:00Z"
                },
                {
                    id: "mock-egfr-001",
                    code: "33914-3",
                    text: "eGFR",
                    value: 32,
                    unit: "mL/min/1.73m2",
                    referenceRange: ">60 mL/min/1.73m2",
                    effectiveDateTime: "2026-03-06T08:00:00Z"
                }
            ])
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
            <ObservationList observations={patientData.observations} />
            <RenalDosingPanel drugs={renallyDosedAbx} observations={renalPanel}/>
        </>
    )
}