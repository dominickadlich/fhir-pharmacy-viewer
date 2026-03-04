import { ParsedAllergy } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface AllergyListProps {
    allergies: ParsedAllergy[];
}

export default function AllergyList({ allergies }: AllergyListProps) {
    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-white">Allergies</h1>
                </div>
            </div>
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="relative min-w-full divide-y divide-white/15">
                    <thead>
                        <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white sm:pl-0">
                            Allergen Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Criticality
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Reaction
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Recorded Date
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {allergies.map((allergy) => (
                        <tr key={allergy.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-white sm:pl-0">
                            {allergy.code}
                            </td>
                            <td className={`px-3 py-4 text-sm whitespace-nowrap ${allergy.criticality === 'high' 
                                ? "text-red-400" 
                                : allergy.criticality === 'low' 
                                ? "text-yellow-400"
                                : "text-gray-400"}`}>
                                    {allergy.criticality}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{allergy.reaction}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{formatDate(allergy.recordedDate)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>   
    )
}