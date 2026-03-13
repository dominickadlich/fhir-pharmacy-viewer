import { NEBRASKA_MEDICINE_RENAL_POLICY } from "./constants/renalPolicy";
import { ParsedPatient, ParsedObservation } from "./fhir/parsers";

function calculateAge(dob: string) {
    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
    return age;
}

export function estimateCrCl(age: number, weight: number = 70, scr: number, gender: string) {
    const crcl = ((140 - age) * weight) / (72 * scr);
    return gender === 'female' ? Math.round(crcl * 0.85) : Math.round(crcl)
}

export function buildRenalDosingPrompt(
    patient: ParsedPatient,
    renalDrugs: string[],
    renalLabs: ParsedObservation[],
    institutionalPolicy: string = NEBRASKA_MEDICINE_RENAL_POLICY,
): string {
    const age = calculateAge(patient.dob);
    const scr = renalLabs.find(lab => lab.code === "2160-0")?.value ?? null;
    const egfr = renalLabs.find(lab => lab.code === "33914-3")?.value ?? null;
    const crcl = scr ? estimateCrCl(age, 70, scr, patient.gender) : null;

    const renalContext = [
        scr ? `Serum Creatinine: ${scr} mg/dL` : null,
        egfr ? `eGFR: ${egfr} mL/min/1.73m2` : null,
        crcl ? `Estimated CrCl (Cockcroft-Gault, 70kg): ${crcl} mL/min` : null
    ].filter(Boolean).join(", ");

    return `You are a clinical pharmacist working at an academic medical center reviewing a patient's antibiotic regimen for renal dose adjustments.

INSTITUTIONAL RENAL DOSING POLICY:
${institutionalPolicy}

PATIENT:
${patient.name}, MRN: ${patient.mrn} is a ${age} year old ${patient.gender} with ${renalContext}. They are currently receiving ${renalDrugs.join(', ')}, which require renal dose adjustment per institutional protocol.

TASK:
Review the patient's current antibiotic regimen against the institutional policy above and identify any doses that require adjustment based on the patient's renal function.

OUTPUT FORMAT:
Write your recommendations as a provider message requesting dose change approval. Be specific: include the drug name, current dose, recommended dose, and the CrCl threshold that applies. Do not use markdown formatting. Write in plain prose only.`
.trim();
}