import type { AdresseForslag } from "../types";

export async function hentAdresseForslag(
  søgetekst: string,
): Promise<AdresseForslag[]> {

  const response = await fetch(
    `/api/dar/address-suggestions?search=${encodeURIComponent(søgetekst)}`
  );

  if (!response.ok) {
    throw new Error("Kunne ikke hente adresser.");
  }

  const data: AdresseForslag[] = await response.json();

  console.log("Adresseforslag fra API:", data);

  return data;
}