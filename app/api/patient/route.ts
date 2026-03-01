import { NextResponse } from 'next/server';

const FHIR_BASE = process.env.EPIC_FHIR_BASE_URL!;

export async function GET(request: Request) {
  const testPatientId = '87a339d0-8cae-418e-89c7-8651e6aab3c6';
  
  const res = await fetch(`${FHIR_BASE}/MedicationRequest?patient=${testPatientId}`, {
    headers: { 'Accept': 'application/fhir+json' },
  });

    if (!res.ok) {
        return NextResponse.json({ 
            error: 'FHIR request failed', status: res.status 
        }, { 
            status: res.status 
        });
    }

    const data = await res.json();


    return new Response(JSON.stringify(data, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
}