export interface Adresse {
  lokalId: string;

  adressebetegnelse: string;

  vejnavn: string;

  husnummer: string;

  etage?: string;

  dør?: string;

  postnummer: string;

  postdistrikt: string;

  kommunekode?: string;

  adgangsadresseId?: string;

  status?: string;

  registreringFra?: string;

  virkningFra?: string;

  x?: number;

  y?: number;
}