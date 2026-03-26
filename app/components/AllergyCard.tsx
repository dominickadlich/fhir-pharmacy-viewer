import { ParsedAllergy } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface AllergyListProps {
    allergies: ParsedAllergy[];
}

const criticalityConfig = {
  high: { border: 'border-l-red-500', pill: 'text-red-200 bg-red-900/60' },
  low:  { border: 'border-l-yellow-500', pill: 'text-yellow-800 bg-yellow-100' },
  "unable-to-assess":  { border: 'border-l-gray-500', pill: 'text-gray-800 bg-gray-100' },
  unknown:  { border: 'border-l-gray-500', pill: 'text-gray-800 bg-gray-100' },
} as const;

export default function AllergyCard({ allergies }: AllergyListProps) {
    

    return (
        <>
            <h1 className="pl-2 mb-2 text-base font-semibold text-gray-400">Allergies</h1>
            <div className="grid grid-cols-2 justify-items-center">
            {allergies.map((allergy) => {
                const config = criticalityConfig[allergy.criticality] ?? criticalityConfig.unknown;

                return (
                <div 
                    key={allergy.id}
                    className={`p-4 mb-5 w-200 rounded-r-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10 border-l-2 ${config.border}`}
                >
                    <div>
                        <div className="flex justify-between items-center pr-4">
                            <div className="px-3 py-2 text-lg font-semibold whitespace-nowrap text-white">{allergy.code}</div>
                            <div className={`px-3 text-sm whitespace-nowrap rounded-full border border-white/10 ${config.pill}`}>
                                        {allergy.criticality.charAt(0).toUpperCase() + allergy.criticality.slice(1)} criticality
                            </div>
                        </div>
                        <div className="flex items-center pr-4">
                            <div className="px-3 py-2 text-sm text-white">Reaction: {allergy.reaction ? allergy.reaction : "None recorded"} &middot; Recorded: {formatDate(allergy.recordedDate)}</div>
                        </div>
                    </div>
                </div>
            )})}
            </div>
        </>
    )
}