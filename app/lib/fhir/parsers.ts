export interface ParsedPatient {
    id: string;
    name: string;
    initials: string;
    dob: string;
    gender: string;
    mrn: string;
}

export interface ParsedMedication {
    id: string;
    name: string;
    status: string;
    authoredOn: string;
    sig: string;
    indication: string;
    refillsAllowed: number;
}

export interface ParsedAllergy {
    id: string;
    code: string;
    criticality: string;
    reaction: string;
    recordedDate: string;
}

export interface ParsedObservation {
    id: string;
    code: string;
    text: string;
    value: number | null;
    unit: string;
    referenceRange: string;
    effectiveDateTime: string;
}

export function parsePatient(patient: fhir4.Patient): ParsedPatient | null {
    if (!patient || patient.resourceType !== 'Patient') return null;

    const nameObj = patient.name?.[0];
    const given = nameObj?.given?.[0] ?? "";
    const family = nameObj?.family?.[0] ?? "";
    const name = nameObj?.text ?? `${given} ${family}`.trim();
    const initials = `${given[0] ??""}${family[0] ?? ""}`.toUpperCase()

    const mrn = patient.identifier?.find(id =>
        id.type?.coding?.some(c => c.code === "MR")
    )?.value ?? ""

    return {
        id: patient.id ?? "",
        name,
        initials,
        dob: patient.birthDate ?? "",
        gender: patient.gender ?? "",
        mrn
    }
}

export function parseObservation(entry: fhir4.Observation): ParsedObservation | null {
    if (!entry || entry.resourceType !== 'Observation') return null;

    return {
        id: entry.id ?? "",
        code: entry.code?.coding?.[0]?.code ?? "",
        text: entry.code?.text ?? "Unknown Observation",
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
        indication: entry.reasonCode?.[0]?.text ?? "",
        refillsAllowed: entry.dispenseRequest?.numberOfRepeatsAllowed ?? 0
    }
}