import { ParsedAllergy } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface AllergyListProps {
    allergies: ParsedAllergy[];
}

export default function AllergyCard({ allergies }: AllergyListProps) {
    return (
        <>
            {/* <h1 className="text-base font-semibold text-white">Medications</h1> */}
            {allergies.map((allergy) => (
                <div className="mt-10 mb-5 w-200 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10" key={allergy.id}>
                    <ul>
                        <li className="px-3 py-2 text-sm font-medium whitespace-nowrap text-white">Name: {allergy.code}</li>
                        <li className={`px-3 py-4 text-sm whitespace-nowrap ${allergy.criticality === 'high' 
                                ? "text-red-400" 
                                : allergy.criticality === 'low' 
                                ? "text-yellow-400"
                                : "text-gray-400"}`}>
                                    Critiality: {allergy.criticality}
                        </li>
                        <li className="px-3 py-2 text-sm text-white">Reaction {allergy.reaction ? allergy.reaction : "None recorded"} </li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Recorded Date: {formatDate(allergy.recordedDate)}</li>
                    </ul>
                </div>
            ))}
        </>
    )
}