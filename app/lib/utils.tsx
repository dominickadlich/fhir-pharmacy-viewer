import { RENAL_DOSE_ANTIBIOTICS } from "./constants/renalDoseAntibiotics";
import { RENAL_LAB_LOINC } from "./constants/renalLabs";
import { ParsedAllergy, ParsedMedication, ParsedObservation } from "./fhir/parsers"

export function formatDate(date: string): string {
    const [getDate, time] = date.split('T')
    const [year, month, day] = getDate.split('-')
    return `${month}/${day}/${year}`
}

export function findDrugAllergyConflicts(
    medications: ParsedMedication[] | undefined,
    allergies: ParsedAllergy[] | undefined
): {
    drug: string;
    allergy: string
}[] {
    const conflicts: { drug: string; allergy: string }[] = []

    medications?.forEach(med => {
        allergies?.forEach(allergy => {
            if (med.name.toLocaleLowerCase().includes(allergy.code.toLocaleLowerCase())) {
                conflicts.push({ drug: med.name, allergy: allergy.code });
            }
        });
    });

    return conflicts;
}

export function filterRenalDoseAntibiotics(
    medications: ParsedMedication[] | undefined,
): string[] {
    const renallyDosedAbx = Object.values(RENAL_DOSE_ANTIBIOTICS)

    return medications?.filter(med =>
        // some() returns true if any element in the array satisfies the condition. 
        renallyDosedAbx.some(abx =>
            med.name.toLowerCase().includes(abx.toLowerCase())
        )
    ).map(med => med.name) ?? []
}


export function filterRenalLabs(
    labs: ParsedObservation[] | undefined,
): ParsedObservation[] {
    const renalLabs = Object.keys(RENAL_LAB_LOINC)

    return labs?.filter(lab => 
        renalLabs.some(rl => 
            lab.code === rl
        )
    ) ?? []
}