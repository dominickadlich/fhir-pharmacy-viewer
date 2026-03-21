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
    status: "unknown" | "active" | "on-hold" | "cancelled" | "completed" | "entered-in-error" | "stopped" | "draft";
    authoredOn: string;
    sig: string;
    indication: string;
    refillsAllowed: number;
}

export interface ParsedAllergy {
    id: string;
    code: string;
    criticality: 'high' | 'low' | 'unable-to-assess' | 'unknown';
    reaction: string; 
    recordedDate: string;
}

export interface ParsedObservation {
    id: string;
    code: string;
    text: string;
    value: number | null;
    unit: string;
    referenceRangeLow: number | null;
    referenceRangeHigh: number | null;
    effectiveDateTime: string;
    interpretation: "High" | "Low" | "WNL" | "Unknown";
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

    const value = entry.valueQuantity?.value
    const referenceRangeLow = entry.referenceRange?.[0]?.low?.value
    const referenceRangeHigh = entry.referenceRange?.[0]?.high?.value

    let interpretation: "High" | "Low" | "WNL" | "Unknown" = 'Unknown'
 
    if (value === undefined || referenceRangeLow === undefined || referenceRangeHigh === undefined) {
        interpretation = 'Unknown'
    } else if (value > referenceRangeLow && value < referenceRangeHigh) {
        interpretation = 'WNL'
    } else if (value > referenceRangeHigh) {
        interpretation = 'High'
    } else {
        interpretation = 'Low'
    }

    return {
        id: entry.id ?? "",
        code: entry.code?.coding?.[0]?.code ?? "",
        text: entry.code?.text ?? "Unknown Observation",
        value: value ?? null,
        unit: entry.valueQuantity?.unit ?? entry.valueQuantity?.code ?? "",
        referenceRangeLow: referenceRangeLow ?? null,
        referenceRangeHigh: referenceRangeHigh ?? null,
        effectiveDateTime: entry.effectiveDateTime ?? "",
        interpretation: interpretation
    }
}

export function parseAllergy(entry: fhir4.AllergyIntolerance): ParsedAllergy | null {
    if (!entry || entry.resourceType !== "AllergyIntolerance") return null;

    return {
        id: entry.id ?? "",
        code: entry.code?.text ?? entry.code?.coding?.[0]?.display ?? "Unknown allergen",
        criticality: entry.criticality ?? "unknown",
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