# FHIR Pharmacy Viewer

A pharmacy-focused patient viewer built on SMART on FHIR and Epic's R4 sandbox.
Demonstrates how modern healthcare interoperability standards can support
clinical medication review workflows in a web application.

## What It Does

Authenticates via SMART on FHIR OAuth 2.0, retrieves patient clinical data from
Epic's sandbox, and surfaces pharmacy-relevant resources — medications, allergies,
and lab results — in a clinician-facing UI. Includes drug-allergy interaction
flagging with a roadmap toward RxNorm class-level lookups and LLM-assisted
renal dosing review.

## Tech Stack

Next.js · TypeScript · Tailwind CSS · fhirclient.js · Vercel
Epic FHIR R4 · SMART on FHIR v2 · PKCE OAuth 2.0 · Anthropic Claude API

## Known Limitations

Drug-allergy cross-checking flags when a medication name matches a documented 
allergen. A production implementation would require RxNorm class-level lookups —
current string matching will not catch cross-reactive classes.

## Launch the Application

Navigate to [fhir-pharmacy-viewer.vercel.app](https://fhir-pharmacy-viewer.vercel.app)
and click the **Pharmacy Viewer** button to initiate the Epic OAuth 2.0 login flow.

## Sign-In Credentials

Clinician-level privileges are required to access medications, allergies, and lab
results. Use the following sandbox credentials:

| Field    | Value         |
|----------|---------------|
| Username | `FHIRTWO`     |
| Password | `EpicFhir11!` |

> These are Epic-provided sandbox credentials for the open development environment.
> Do not use real patient credentials.

## Selecting a Patient

1. After login, confirm your location — the pre-populated value is fine.
2. Select a patient from the list and click **Accept**.
3. When prompted, allow the application access to patient data.

## Pharmacy Profile View

You'll be redirected to the **Pharmacy Profile**, which displays:

- **Patient header** — demographics including name, date of birth, and MRN
- **Drug-allergy flag** — banner alert when a medication name matches a documented allergen
- **Medication list** — active medications with sig, indication, and authorized refills
- **Allergy list** — documented allergens with criticality and reaction
- **Lab results** — most recent laboratory observations, where available

## Renal Dosing Review

An agentic LLM pipeline reviews the patient's active antibiotic regimen against
the Nebraska Medicine Antimicrobial Stewardship renal dosing protocol. The pipeline
uses Claude's tool use API to retrieve labs, calculate Cockcroft-Gault creatinine
clearance, and generate a provider-facing dose adjustment recommendation.

> Epic sandbox patients are outpatient profiles without active IV antibiotic orders
> or renal lab values. The renal dosing panel runs against mock data to demonstrate
> the end-to-end pipeline.