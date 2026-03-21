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
import MedicationCard from "@/app/components/medicationCard"
import AllergyCard from "@/app/components/AllergyCard"
import LabCard from "@/app/components/LabCard"

export default function CallbackPage() {
    const isReadyCalled = useRef(false)
    const [patientData, setPatientData] = useState<Awaited<ReturnType<typeof getPatientData>> | null>(null)
    const [conflicts, setConflicts] = useState<{drug: string, allergy: string}[]>([])
    const [renalPanel, setRenalPanel] = useState<ParsedObservation[]>([]);
    const [renallyDosedAbx, setRenallyDosedAbx] = useState<ParsedMedication[]>([]);
    const [renalRecommendaiton, setRenalRecommendation] = useState<string>('')

    useEffect(() => {
        if (isReadyCalled.current) return;
        isReadyCalled.current = true;

        getPatientData().then(async (data) => {
            setPatientData(data)
            setConflicts(findDrugAllergyConflicts(data.medications, data.allergies))
            // setRenallyDosedAbx(filterRenalDoseAntibiotics(data.medications))
            // setRenalPanel(filterRenalLabs(data.observations))


            const mockLabs: ParsedObservation[] = [
                { id: "mock-scr-001", code: "2160-0", text: "Serum Creatinine", value: 3.1, unit: "mg/dL", referenceRangeLow: 0.6, referenceRangeHigh: 1.2, effectiveDateTime: "2026-03-06T08:00:00Z", interpretation: "High" },
                { id: "mock-egfr-001", code: "33914-3", text: "eGFR", value: 32, unit: "mL/min/1.73m2", referenceRangeLow: 60, referenceRangeHigh: 120, effectiveDateTime: "2026-03-06T08:00:00Z", interpretation: "Low" }
            ]

            const mockDrugs: ParsedMedication[] = [
                {id: "mock-drug-01", name: "Acyclovir", status: 'active', authoredOn: "02/02/2026", sig: "IV 700mg Q8H" , indication: "virus", refillsAllowed: 0 },
                {id: "mock-drug-02", name: "Amoxicillin", status: "active", authoredOn: "02/02/2026", sig: "875mg PO Q12H" , indication: "bacteria", refillsAllowed: 0 },
            ]

            setRenalPanel(mockLabs)
            setRenallyDosedAbx(mockDrugs)

            // const res = await fetch('/api/renal-review', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ 
            //         patient: parsePatient(data.patient),
            //         medications: mockDrugs,
            //         observations: mockLabs,
            //     }),
            // });
            // const { recommendation } = await res.json();
            // setRenalRecommendation(recommendation)

            console.log(data)
            // const patientId = "87a339d0-8cae-418e-89c7-8651e6aab3c6";
            // const base = "https://r4.smarthealthit.org";
    
            // const [observations, medications, conditions] = await Promise.all([
            //     fetch(`${base}/Observation?patient=${patientId}&category=laboratory&_count=50`).then(r => r.json()),
            //     fetch(`${base}/MedicationRequest?patient=${patientId}&_count=50`).then(r => r.json()),
            //     fetch(`${base}/Condition?patient=${patientId}&_count=50`).then(r => r.json()),
            // ]);
    
            // console.log("OBSERVATIONS:", JSON.stringify(observations, null, 2));
            // console.log("MEDICATIONS:", JSON.stringify(medications, null, 2));
            // console.log("CONDITIONS:", JSON.stringify(conditions, null, 2));
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
            <MedicationCard medications={patientData.medications}/>
            <AllergyCard allergies={patientData.allergies} />
            <LabCard observations={patientData.observations} />
            <RenalDosingPanel drugs={renallyDosedAbx} observations={renalPanel} recommendation={renalRecommendaiton} />
        </>
    )
}