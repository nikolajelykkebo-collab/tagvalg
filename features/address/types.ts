export interface AdresseForslag {
    id: string;
    tekst: string;
}

export interface Adresse {
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

