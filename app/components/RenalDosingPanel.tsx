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
        <div>
            <h1 className="pl-2 mb-2 text-base font-semibold text-gray-400">Renal Recommendation</h1>
            <div className="divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10">
                    <div className="px-4 py-5 sm:p-6 text-sm text-white prose prose-invert max-h-112 overflow-y-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{recommendation}</ReactMarkdown>
                </div>
            </div>
        </div>
  )
}