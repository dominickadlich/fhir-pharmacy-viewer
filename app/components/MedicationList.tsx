import { ParsedMedication } from "../lib/fhir/parsers";

export interface MedicationListProps {
    medications: ParsedMedication[];
}

export default function MedicationList({ medications }: MedicationListProps) {
    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-white">Medications</h1>
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
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Sig
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Indication
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Refills
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {medications.map((medication) => (
                        <tr key={medication.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-white sm:pl-0">
                            {medication.name}
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{medication.status}</td>
                            <td className="px-3 py-4 text-sm text-gray-400">{medication.sig}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{medication.indication}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-400">{medication.refillsAllowed}</td>
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