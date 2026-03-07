import Anthropic from "@anthropic-ai/sdk";
import { ParsedObservation, ParsedPatient } from "@/app/lib/fhir/parsers";
import { buildRenalDosingPrompt } from "@/app/lib/promptBuilder";
import { NextResponse } from "next/server";

export default async function POST(request: Request) {
    const { patient, renalDrugs, renalLabs }: {
        patient: ParsedPatient,
        renalDrugs: string[],
        renalLabs: ParsedObservation[],
    } = await request.json();

    const prompt = buildRenalDosingPrompt(patient, renalDrugs, renalLabs)

    const anthropic = new Anthropic();

    const msg = await anthropic.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
  });
  const recommendation = msg.content[0].type === "text" ? msg.content[0].text : '';

  return NextResponse.json({ recommendation })
}