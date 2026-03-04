'use client'

import { XCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function DrugAllergyFlag({ 
    drug,
    allergy
}: {
    drug: string
    allergy: string
}) {
    const [isActive, setIsActive] = useState(true)

    if (!isActive) return null;

  return (
    <div className="rounded-md bg-red-500/10 p-4 outline outline-red-500/20">
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-200">Drug Allergy Interaction</h3>
          <div className="mt-2 text-sm text-red-200/85">
            <p>Please review the patients medication and allergy list. There is an interaction between {drug} & {allergy}</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="ml-3 rounded-md px-2 py-1.5 text-sm font-medium text-red-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-500/50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
