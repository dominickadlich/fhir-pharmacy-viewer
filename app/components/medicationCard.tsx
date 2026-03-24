import { ParsedMedication } from "../lib/fhir/parsers";

export interface MedicationListProps {
    medications: ParsedMedication[];
}

const statusConfig = {
    active: {pill: "text-green-200 bg-green-900/60"},
    "on-hold": {pill: "text-yellow-800 bg-yellow-100"},
    completed: {pill: "text-yellow-800 bg-yellow-100"},
    draft: {pill: "text-yellow-800 bg-yellow-100"},
    cancelled: {pill: "text-red-200 bg-red-900/60"},
    "entered-in-error": {pill: "text-red-200 bg-red-900/60"},
    stopped: {pill: "text-red-200 bg-red-900/60"},
    unknown: {pill: "text-gray-800 bg-gray-100"}
}

export default function MedicationCard({ medications }: MedicationListProps) {
    return (
        <div>
        <h1 className="pl-2 mb-2 text-base font-semibold text-gray-400">Medications</h1>
                {/* Content goes here */}
                {medications.map((medication) => {
                    const config = statusConfig[medication.status] ?? statusConfig.unknown;

                    return (
                    <div 
                        className="px-4 py-5 mb-5 w-200 overflow-hidden rounded-r-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10" 
                        key={medication.id}
                    >
                        <div className="flex justify-between items-center">
                            <div className="px-3 text-lg font-semibold whitespace-nowrap text-white">{medication.name}</div>
                            <div className={`px-3 text-sm whitespace-nowrap rounded-full border border-white/10 ${config.pill}`}>{medication.status}</div>
                        </div>
                        <div className="px-3 py-2 text-sm text-white">{medication.sig}</div>

                        <div aria-hidden="true" className="w-full p-2 border-t border-white/15" />
                        
                        <div className="grid grid-cols-2">
                            <div className="px-3 text-sm whitespace-nowrap text-gray-400">Indication</div>
                            <div className="px-3 text-sm whitespace-nowrap text-gray-400">Refills</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-3 text-sm whitespace-nowrap text-white">{medication.indication}</div>
                            <div className="px-3 text-sm whitespace-nowrap text-white">{medication.refillsAllowed}</div>
                        </div>
                    </div>
                    )
                })}
        </div>
    )
}