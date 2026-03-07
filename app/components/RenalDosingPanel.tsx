import { ParsedObservation } from "../lib/fhir/parsers";

export default async function RenalDosingPanel({
    drugs,
    observations,
}: {
    drugs: string[];
    observations: ParsedObservation[];
}) {
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10">
      <div className="px-4 py-5 sm:px-6">
        Renal Panel
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-5 sm:p-6">
            {drugs.map((drug, i) => (
                <p key={i} className="text-sm text-white">{drug}</p>
            ))}</div>
        <div className="px-4 py-5 sm:p-6">
            {observations.map((obs) => (
                <p key={obs.id} className="text-sm text-white">
                    {obs.text}: {obs.value} {obs.unit}
                </p>
            ))}
        </div>
    </div>
    </div>
  )
}