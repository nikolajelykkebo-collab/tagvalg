import type {
    AdresseForslag,
} from "../types";

import type {
    AdresseData,
    BygningData,
    EjendomData,
} from "../../wizard/types";

import type {
    DarGrundNode,
    DarEjendomsrelationNode,
} from "../../../lib/datafordeler/bbr/bbr.types";


export interface AdresseResultat {

    adresse: AdresseData;

    bygning: BygningData | null;

    grund: DarGrundNode | null;

    ejendomsrelation:
        DarEjendomsrelationNode | null;

    ejendom: EjendomData | null;

}

interface ApiAdresse {

    id: string;

    adressebetegnelse: string;

    husnummer: string;

    etage: string | null;

    dør: string | null;

    bygningId: string | null;

}

interface ApiAdresseResultat {

    adresse: ApiAdresse;

    bygning: BygningData | null;

    grund: DarGrundNode | null;

    ejendomsrelation:
        DarEjendomsrelationNode | null;

    ejendom: EjendomData | null;

}

async function håndterSvar<T>(
    response: Response,
): Promise<T> {

    if (!response.ok) {

        let fejlbesked =
            `HTTP ${response.status}`;

        try {

            const fejl =
                await response.json();

            if (
                fejl &&
                typeof fejl === "object" &&
                "error" in fejl &&
                typeof fejl.error === "string"
            ) {

                fejlbesked =
                    fejl.error;

            }

        } catch {

            // Ignorer hvis svaret ikke er JSON

        }

        throw new Error(
            fejlbesked,
        );

    }

    return (
        await response.json()
    ) as T;

}

function mapAdresse(
    adresse: ApiAdresse,
): AdresseData {

    return {

        id:
            adresse.id,

        tekst:
            adresse.adressebetegnelse,

        husnummer:
            adresse.husnummer,

        etage:
            adresse.etage
                ?? undefined,

        dør:
            adresse.dør
                ?? undefined,

        darId:
            adresse.id,

    };

}

export async function hentAdresseForslag(
    søgetekst: string,
): Promise<AdresseForslag[]> {

    const søgning =
        søgetekst.trim();

    if (
        søgning.length < 2
    ) {

        return [];

    }

    const response =
        await fetch(
            `/api/dar/address-suggestions?search=${encodeURIComponent(
                søgning,
            )}`,
            {
                method: "GET",

                headers: {
                    Accept: "application/json",
                },

                cache: "no-store",
            },
        );

    return håndterSvar<
        AdresseForslag[]
    >(
        response,
    );

}

export async function hentAdresse(
    adressebetegnelse: string,
): Promise<AdresseResultat> {

    const søgning =
        adressebetegnelse.trim();

    if (!søgning) {

        throw new Error(
            "Adressebetegnelse mangler.",
        );

    }

    const response =
        await fetch(
            `/api/dar/address?adressebetegnelse=${encodeURIComponent(
                søgning,
            )}`,
            {
                method: "GET",

                headers: {
                    Accept: "application/json",
                },

                cache: "no-store",
            },
        );

    const resultat =
        await håndterSvar<
            ApiAdresseResultat
        >(
            response,
        );

    return {

        adresse:
            mapAdresse(
                resultat.adresse,
            ),

        bygning:
            resultat.bygning,

        grund:
            resultat.grund,

        ejendomsrelation:
            resultat.ejendomsrelation,

        ejendom:
            resultat.ejendom,

    };

}