import { ParsedMedication, ParsedObservation } from "../lib/fhir/parsers";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export default function RenalDosingPanel({
    drugs,
    observations,
    recommendation,
}: {
    drugs: ParsedMedication[];
    observations: ParsedObservation[];
    recommendation: string;
}) {
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10">
      <div className="px-4 py-5 sm:px-6">
        Renal Panel
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-5 sm:p-6">
            {drugs.map((drug, i) => (
                <p key={i} className="text-sm text-white">{drug.name}</p>
            ))}</div>
        <div className="px-4 py-5 sm:p-6">
            {observations.map((obs) => (
                <p key={obs.id} className="text-sm text-white">
                    {obs.text}: {obs.value} {obs.unit}
                </p>
            ))}
        </div>
    </div>
        <div className="px-4 py-5 sm:p-6 text-sm text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{recommendation}</ReactMarkdown>
        </div>
    </div>
  )
}