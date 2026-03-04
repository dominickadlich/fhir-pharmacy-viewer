import { ParsedAllergy, ParsedMedication } from "./fhir/parsers"

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