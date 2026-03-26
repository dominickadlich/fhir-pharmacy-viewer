import { ParsedObservation } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface ObservationListProps {
    observations: ParsedObservation[]
}

const statusConfig = {
    WNL: {pill: "text-green-200 bg-green-900/60"},
    Low: {pill: "text-yellow-800 bg-yellow-100"},
    High: {pill: "text-red-200 bg-red-900/60"},
    Unknown: {pill: "text-gray-800 bg-gray-100"}
} as const;

export default function LabCard({ observations }: ObservationListProps) {
    return (
        <div>
            <h1 className="grid justify-items-center pl-2 mb-2 text-base font-semibold text-gray-400">Labs</h1>

            <div className="grid grid-cols-2 justify-items-center">
                {observations.map((lab) => {
                const config = statusConfig[lab.interpretation] ?? statusConfig.Unknown

                return (
                <div 
                    className="px-4 py-5 mb-5 w-3xs overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10" 
                    key={lab.id}
                >
                    <div className="px-3 text-sm font-semibold whitespace-nowrap text-gray-400">{lab.text}</div>
                    <div className="flex items-center">
                        <div className="px-3 py-2 text-xl whitespace-nowrap text-white">{lab.value}</div>
                        <div className="px-3 py-2 text-sm text-white">{lab.unit}</div>
                        <div className={`px-3 text-sm whitespace-nowrap rounded-full border border-white/10 ${config.pill}`}>{lab.interpretation}</div>
                    </div>

                    <div aria-hidden="true" className="w-full p-2 border-t border-white/15" />

                    <div className="px-3 py-2 text-xs whitespace-nowrap text-white">Ref Range: {lab.referenceRangeLow}-{lab.referenceRangeHigh}</div>
                    <div className="px-3 py-2 text-xs whitespace-nowrap text-white">Date: {formatDate(lab.effectiveDateTime)}</div>
                </div>
                    )})}
            </div>
        </div>
    )
}