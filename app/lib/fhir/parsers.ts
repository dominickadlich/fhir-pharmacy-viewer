export interface ParsedMedication {
    id: string;
    name: string;
    status: string;
    authoredOn: string;
    sig: string;
    indication: string;
    refillsAllowed: number;
}

interface ParsedAllergy {
    id: string;
    code: string;
    criticality: string;
    reaction: string;
    recordedDate: string;
}

interface ParsedObservation {
    id: string;
    code: string;
    value: number | null;
    unit: string;
    referenceRange: string;
    effectiveDateTime: string;
}

export function parseObservation(entry: fhir4.Observation): ParsedObservation | null {
    if (!entry || entry.resourceType !== 'Observation') return null;

    return {
        id: entry.id ?? "",
        code: entry.code?.text ?? entry.code?.coding?.[0]?.display ?? "Unknown Observation",
        value: entry.valueQuantity?.value ?? null,
        unit: entry.valueQuantity?.unit ?? entry.valueQuantity?.code ?? "",
        referenceRange: entry.referenceRange?.[0]?.text ?? `${entry.referenceRange?.[0]?.low?.value ?? ""} - ${entry.referenceRange?.[0]?.high?.value ?? ""}`,
        effectiveDateTime: entry.effectiveDateTime ?? "",
    }
}

export function parseAllergy(entry: fhir4.AllergyIntolerance): ParsedAllergy | null {
    if (!entry || entry.resourceType !== "AllergyIntolerance") return null;

    return {
        id: entry.id ?? "",
        code: entry.code?.text ?? entry.code?.coding?.[0]?.display ?? "Unknown allergen",
        criticality: entry.criticality ?? "Unknown",
        reaction: entry.reaction?.[0]?.manifestation?.[0]?.text ?? "",
        recordedDate: entry.recordedDate ?? "",
    }
}

export function parseMedications(entry: fhir4.MedicationRequest): ParsedMedication | null {
    if (!entry || entry.resourceType !== "MedicationRequest") return null;
    
    const name = entry.medicationCodeableConcept?.text
        ?? entry.medicationCodeableConcept?.coding?.[0]?.display
        ?? (entry.medicationReference as fhir4.Reference)?.display
        ?? "Unknown medication";

    return {
        id: entry.id ?? "",
        name,
        status: entry.status ?? "",
        authoredOn: entry.authoredOn ?? "",
        sig: entry.dosageInstruction?.[0]?.text ?? "",
        indication: entry.reasonCode?.[0].text ?? "",
        refillsAllowed: entry.dispenseRequest?.numberOfRepeatsAllowed ?? 0
    }
}