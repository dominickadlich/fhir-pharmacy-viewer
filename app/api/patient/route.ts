import { NextResponse } from 'next/server';

const FHIR_BASE = process.env.EPIC_FHIR_BASE_URL!;

export async function GET() {
  const testPatientId = 'erXuFYUfucBZaryVksYEcMg3';
  
  const res = await fetch(`${FHIR_BASE}/Patient/${testPatientId}`, {
    headers: { 'Accept': 'application/fhir+json' },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'FHIR request failed', status: res.status }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}