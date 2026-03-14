import Anthropic from "@anthropic-ai/sdk";
import { ParsedMedication, ParsedObservation, ParsedPatient } from "@/app/lib/fhir/parsers";
import { buildRenalDosingPrompt, calculateAge, estimateCrCl } from "@/app/lib/promptBuilder";
import { NextResponse } from "next/server";
import { filterRenalDoseAntibiotics, filterRenalLabs } from "@/app/lib/utils";
import { NEBRASKA_MEDICINE_RENAL_POLICY } from "@/app/lib/constants/renalPolicy";
import { tools } from "@/app/lib/tools";

function lookupDrugProtocol(drug_name: string) {
    const lines = NEBRASKA_MEDICINE_RENAL_POLICY.split('\n');
    
    const drugIndex = lines.findIndex(line => 
        line.toLowerCase().includes(drug_name.toLowerCase())
    );
    if (drugIndex === -1) return `${drug_name} is not in the renal dosing protocol.`

    // Find the indentation level of the matched drug header
    const drugIndent =lines[drugIndex].match(/^(\s*)/)?.[1].length ?? 0;

    // Find the next line at the same indentation level
    const nextDrugIndex = lines.findIndex((line, i) => {
        if (i <= drugIndex) return false;
        if (line.trim() === '') return false;
        const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
        return indent === drugIndent;
    });

    const section = nextDrugIndex === -1
        ? lines.slice(drugIndex)
        : lines.slice(drugIndex, nextDrugIndex)

    return section.join('\n')
}

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

const SYSTEM_PROMPT = `You are a clinical pharmacist reviewing antibiotic regimens for renal dose adjustments. Use the available tools to gather patient data, then provide a specific dose adjustment recommendation. Be concise and clinical. Do not use markdown formatting. Write in plain prose only.`;

export async function POST(request: Request) {
    const { patient, medications, observations } = await request.json();

    const anthropic = new Anthropic();

    const messages: Anthropic.MessageParam[] = [{
        role: "user",
        content: `Please review this patients antibiotic regimen for renal dose adjustments.
            Patient: ${patient.name}, ${calculateAge(patient.dob)} year old ${patient.gender}.
            Use the available tools to gather the information you need.
        `
    }];

    let iterations = 0;
    const MAX_ITERATIONS = 10;

    // The loop
    while (true) {
        if (iterations++ > MAX_ITERATIONS) {
            return NextResponse.json({ error: "Agentic loop exceeding max iterations" })    
        }

        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            tools: tools,
            messages: messages
        });

        // Add model's response to conversation history
        messages.push({ role: "assistant", content: response.content });

        // If model is done, return the final text
        if (response.stop_reason === "end_turn") {
            const recommendation = response.content
                .filter((block): block is Anthropic.TextBlock => block.type === "text")
                .map(block => block.text)
                .join("");
            return NextResponse.json({ recommendation });
        }

        // If model wants to use tools, execute them and return results
        if (response.stop_reason === "tool_use") {
            const toolResults: Anthropic.ToolResultBlockParam[] = response.content
                .filter((block): block is Anthropic.ToolUseBlock => block.type === "tool_use")
                .map(block => ({
                    type: "tool_result" as const,
                    tool_use_id: block.id,
                    content: executeToolCall(block.name, block.input as Record<string, unknown>, patient, medications, observations)
                }));

            // Add tool results to conversation and loop again
            messages.push({ role: "user", content: toolResults})
        }
        console.log(JSON.stringify(messages, null, 2))
    }
};