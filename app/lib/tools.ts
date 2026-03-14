import Anthropic from "@anthropic-ai/sdk";

export const tools: Anthropic.Tool[] = [
    {
        name: "get_active_antibiotics",
        description: "Returns the patient's active antibiotic orders that require renal dose adjustment",
        input_schema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_renal_labs",
        description: "Returns the patient's current renal function labs including serum creatinine and eGFR",
        input_schema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "calculate_creatinine_clearance",
        description: "Calculates estimated CrCl using Cockcroft-Gault equation",
        input_schema: {
            type: "object",
            properties: {
                age: { type: "number" },
                weight_kg: { type: "number" },
                scr: { type: "number" },
                gender: { type: "string", enum: ["male", "female"] }
            },
            required: ["age", "weight_kg", "scr", "gender"]
        }
    },
    {
        name: "lookup_dosing_protocol",
        description: "Returns the institutional renal dosing protocol entry for a specific drug",
        input_schema: {
            type: "object",
            properties: {
                drug_name: { type: "string" }
            },
            required: ["drug_name"]
        }
    }
]