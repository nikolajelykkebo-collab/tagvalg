export enum Trin {
  Adresse = 0,
  Ejendom = 1,
  Tag = 2,
  Beregning = 3,
  Kontakt = 4,
  Resultat = 5,
}

export interface AdresseData {
  id: string;
  tekst: string;

  vejnavn?: string;
  husnummer?: string;
  etage?: string;
  dør?: string;

  postnummer?: string;
  postdistrikt?: string;

  darId?: string;

  koordinater?: {
    x: number;
    y: number;
  };
}

export interface EjendomData {
  bfeNummer?: string;

  kommune?: string;

  matrikelnummer?: string;

  ejerlav?: string;

  grundareal?: number;

  bebyggetAreal?: number;

  opførelsesår?: number;
}

export interface BygningData {

    id: string;

    bygningsnummer?: number;

    anvendelse?: string;

    opførelsesår?: number;

    tagdækningsmateriale?: string;

    samletBygningsareal?: number;

    bebyggetAreal?: number;

    etageantal?: number;

    boligareal?: number;

    erhvervsareal?: number;

}

export interface MatrikelData {
  matrikelnummer?: string;

  ejerlav?: string;

  areal?: number;
}

export interface KortData {
  center?: {
    x: number;
    y: number;
  };

  zoom?: number;
}

export interface TagData {
  type?: string;

  materiale?: string;

  hældning?: number;

  areal?: number;

  kviste?: number;

  ovenlysvinduer?: number;

  tilstand?: string;

  tidshorisont?: string;
}

export interface BeregningData {
  tagareal?: number;

  valgtTagtype?: string;

  prisPrKvadratmeter?: number;

  pris?: number;

  prisMin?: number;

  prisMax?: number;

  materialer?: string[];

  arbejdsløn?: number;
}

export interface TilvalgData {
  solceller: boolean;

  efterisolering: boolean;

  tagrender: boolean;
}

export interface KontaktData {
  navn: string;

  email: string;

  telefon: string;

  ønskerOpkald: boolean;
}

export interface BeregnerData {
  adresse: AdresseData | null;

  ejendom: EjendomData | null;

  bygning: BygningData | null;

  matrikel: MatrikelData | null;

  kort: KortData | null;

  tag: TagData | null;

  beregning: BeregningData | null;

  tilvalg: TilvalgData;

  kontakt: KontaktData;
}