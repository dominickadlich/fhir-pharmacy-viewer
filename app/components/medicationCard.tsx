import { ParsedMedication } from "../lib/fhir/parsers";

export interface MedicationListProps {
    medications: ParsedMedication[];
}

export default function MedicationCard({ medications }: MedicationListProps) {
    return (
        <>
            {/* <h1 className="text-base font-semibold text-white">Medications</h1> */}
            <div className="mt-10 mb-5 w-200 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10">
                <div className="px-4 py-5">
                    {/* Content goes here */}
                    {medications.map((medication) => (
                    <ul key={medication.id}>
                        <li className="px-3 py-2 text-sm font-medium whitespace-nowrap text-white">Name: {medication.name}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Status: {medication.status}</li>
                        <li className="px-3 py-2 text-sm text-white">Sig: {medication.sig}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Indication: {medication.indication}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Refills: {medication.refillsAllowed}</li>
                    </ul>
                    ))}
                </div>
            </div>
        </>
    )
}