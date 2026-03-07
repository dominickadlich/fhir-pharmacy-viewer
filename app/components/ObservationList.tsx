import { ParsedObservation } from "../lib/fhir/parsers";
import { formatDate } from "../lib/utils";

export interface ObservationListProps {
    observations: ParsedObservation[]
}

export default function ObservationList({ observations }: ObservationListProps) {
    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-white">Observations</h1>
                </div>
            </div>
            <div className="mt-2 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="relative min-w-full divide-y divide-white/15">
                    <thead>
                        <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-white sm:pl-0">
                            Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Value
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Unit
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Reference Range
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Effective Date
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {observations?.map((lab) => (
                        <tr key={lab.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-white sm:pl-0">
                            {lab.text}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{lab.value}</td>
                            <td className="px-3 py-4 text-sm text-gray-400">{lab.unit}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{lab.referenceRange}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{formatDate(lab.effectiveDateTime)}</td>
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