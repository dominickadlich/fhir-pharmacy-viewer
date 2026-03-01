import FHIR from "fhirclient";

export async function getFHIRClient() {
  return FHIR.oauth2.ready();
}