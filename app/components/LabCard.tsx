import { ParsedObservation } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface ObservationListProps {
    observations: ParsedObservation[]
}

export default function LabCard({ observations }: ObservationListProps) {
    return (
        <>
            {/* <h1 className="text-base font-semibold text-white">Medications</h1> */}
                    {/* Content goes here */}
                    <div className="grid grid-cols-2">
                    {observations.map((lab) => (
            <div className="mt-5 mb-5 w-200 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10" key={lab.id}>
                    <ul>
                        <li className="px-3 py-2 text-sm font-medium whitespace-nowrap text-white">Name: {lab.text}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Value: {lab.value}</li>
                        <li className="px-3 py-2 text-sm text-white">Unit: {lab.unit}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Reference Range: {lab.referenceRange}</li>
                        <li className="px-3 py-2 text-sm whitespace-nowrap text-white">Effective Date: {formatDate(lab.effectiveDateTime)}</li>
                    </ul>
            </div>
                    ))}
                    </div>
        </>
    )
}