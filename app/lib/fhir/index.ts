import FHIR from "fhirclient";
import { parseAllergy, parseMedications, parseObservation } from "./parsers";
import Client from "fhirclient/lib/Client";

export default async function getPatientData() {
    const client: Client = await FHIR.oauth2.ready();

    const [patient, medBundle, allergyBundle, obsBundle] = await Promise.all([
        client.patient.read(),
        client.patient.request<fhir4.Bundle>("MedicationRequest"),
        client.patient.request<fhir4.Bundle>("AllergyIntolerance"),
        client.patient.request<fhir4.Bundle>("Observation?category=laboratory"),
    ]);

    return {
        patient,
        medication: medBundle.entry
            ?.map(e => parseMedications(e.resource as fhir4.MedicationRequest))
            .filter(Boolean) ?? [],
        allergies: allergyBundle.entry
            ?.map(e => parseAllergy(e.resource as fhir4.AllergyIntolerance))
            .filter(Boolean) ?? [],
        observations: obsBundle.entry
            ?.map(e => parseObservation(e.resource as fhir4.Observation))
            .filter(Boolean)
    }
}