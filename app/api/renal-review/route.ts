import Anthropic from "@anthropic-ai/sdk";
import { ParsedMedication, ParsedObservation, ParsedPatient } from "@/app/lib/fhir/parsers";
import { buildRenalDosingPrompt, estimateCrCl } from "@/app/lib/promptBuilder";
import { NextResponse } from "next/server";
import { filterRenalDoseAntibiotics, filterRenalLabs } from "@/app/lib/utils";

function executeToolCall(
    toolName: string,
    toolInput: Record<string, unknown>,
    patient: ParsedPatient,
    medications: ParsedMedication[],
    observations: ParsedObservation[]
): string {
    switch (toolName) {
        case "get_active_antibiotics":
            const abx = filterRenalDoseAntibiotics(medications);
            return abx.length > 0
                ? `Active renally-dosed antibiotics: ${abx.join(", ")}`
                : "No renally-dosed antibiotics found in active medication list.";

        case "get_renal_labs":
            const labs = filterRenalLabs(observations);
            if (labs.length === 0) return "No renal labs found."
            return labs.map(l => `${l.text}: ${l.value} ${l.unit}`).join(", ");

        case "calculate_creatinine_clearance":
            const { age, weight_kg, scr, gender } = toolInput as {
                age: number; weight_kg: number; scr: number; gender: string;
            }
            const crcl = estimateCrCl(age, weight_kg, scr, gender);
            return `Estimated CrCl (Cockcroft-Gault): ${crcl} ml/min`;

        case "lookup_dosing_protocol":
            const { drug_name } = toolInput as { drug_name: string };
            return lookupDrugProtocol(drug_name);
            
        default:
            return "Tool not found."
    }
}

export async function POST(request: Request) {
    const { patient, renalDrugs, renalLabs }: {
        patient: ParsedPatient,
        renalDrugs: string[],
        renalLabs: ParsedObservation[],
    } = await request.json();

    const prompt = buildRenalDosingPrompt(patient, renalDrugs, renalLabs)

    const anthropic = new Anthropic();

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        cache_control: { type: "ephemeral"},
        messages: [{ role: "user", content: prompt }],
  });
  const recommendation = msg.content[0].type === "text" ? msg.content[0].text : '';

  return NextResponse.json({ recommendation })
}