import { graphqlClient } from "../../clients";

import {
    AdresseForslag,
    AddressSuggestionResponse,
    DarAdresseNode,
    DarPostnummerNode,
    GetAdresseResponse,
    GetPostnummerVedNavnResponse,
} from "../dar.types";

import { mapAdresseForslag } from "../mappers/adresse.mapper";

import { ADDRESS_SUGGESTIONS_QUERY } from "../queries/AdressSuggestions";
import {
    ADDRESS_SUGGESTIONS_VED_POSTNUMRE_QUERY,
} from "../queries/AddressSuggestionsVedPostnumre";
import { GET_ADRESSE } from "../queries/GetAdresse";
import { GET_POSTNUMMER_VED_NAVN } from "../queries/GetPostnummerVedNavn";

const VIRKNINGSTID = "9999-12-31T00:00:00Z";
const REGISTRERINGSTID = "9999-12-31T00:00:00Z";

// Genkender mønstret "<vejnavn og husnummer> <bynavn>" uden
// postnummer imellem, fx "Margrethevej 20 Vejle". Gruppe 1 er
// alt frem til og med husnummeret (sidste cifferkæde, evt.
// efterfulgt af en bogstavbetegnelse som "20A"), gruppe 2 er
// det efterfølgende bynavn.
const GADE_OG_BYNAVN_REGEX =
    /^(.*\d[A-Za-zæøåÆØÅ]{0,2})\s+([A-Za-zæøåÆØÅ][A-Za-zæøåÆØÅ\s.-]*)$/u;

/**
 * Store-bogstaverer et enkelt ords første bogstav (og
 * små-bogstaverer resten). Rører ikke ved ord uden bogstaver
 * (fx husnumre og postnumre som "20" eller "7100").
 */
function stortForbogstav(
    ord: string
): string {

    if (ord.length === 0) {

        return ord;

    }

    return (
        ord.charAt(0).toUpperCase()
            + ord.slice(1).toLowerCase()
    );

}

/**
 * Rydder op i og normaliserer en søgetekst, før den sendes til
 * DAR: fjerner overflødige mellemrum, store-bogstaver hvert
 * ords første bogstav (Datafordeler søger case-sensitivt), og
 * indsætter et manglende komma foran et firecifret postnummer,
 * fx "margrethevej 20 7100 vejle" ->
 * "Margrethevej 20, 7100 Vejle". Bruges både til den løbende
 * auto-forslags-søgning og til det direkte opslag ved
 * Enter/knap-klik, så begge er lige så fleksible.
 *
 * Arbejder ord-for-ord (split/map/join) i stedet for med
 * regex-erstatning på hele strengen, så det aldrig er muligt
 * for et ord — fx husnummeret — utilsigtet at forsvinde
 * undervejs: hvert ord i inputtet er også med i outputtet.
 */
function normaliserSøgetekst(
    tekst: string
): string {

    if (tekst.trim().length === 0) {

        return tekst;

    }

    const ord =
        tekst
            .trim()
            .split(/\s+/)
            .map(stortForbogstav);

    // Find et "ord", der er præcis et firecifret postnummer,
    // og som ikke allerede har komma efter det foregående ord.
    const postnummerIndeks =
        ord.findIndex(
            (enkeltOrd, index) =>
                index > 0
                    && /^\d{4}$/.test(enkeltOrd)
                    && !ord[index - 1].endsWith(","),
        );

    if (postnummerIndeks !== -1) {

        ord[postnummerIndeks - 1] =
            `${ord[postnummerIndeks - 1]},`;

    }

    return ord.join(" ");

}

export class AdresseService {

    /**
     * Henter en adresse fra DAR via adressebetegnelsen.
     *
     * Vi bruger ikke id_lokalId fra DAR_Husnummer,
     * da det er et Husnummer-ID og ikke et Adresse-ID.
     */
    async hentAdresse(
        adressebetegnelse: string
    ): Promise<DarAdresseNode> {

        const response =
            await graphqlClient.query<
                GetAdresseResponse,
                {
                    adressebetegnelse: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: GET_ADRESSE,

                variables: {

                    adressebetegnelse,

                    virkningstid: VIRKNINGSTID,

                    registreringstid: REGISTRERINGSTID,

                },

            });

        const adresse =
            response.DAR_Adresse.nodes[0];

        if (!adresse) {

            throw new Error(
                `Adresse '${adressebetegnelse}' blev ikke fundet.`
            );

        }

        return adresse;

    }

    /**
     * Henter postnumre, hvis bynavn starter med det angivne
     * navn (case-insensitivt), fx "Vejle" -> både "Vejle" og
     * "Vejle Øst".
     */
    private async hentPostnumreVedNavn(
        bynavn: string
    ): Promise<DarPostnummerNode[]> {

        const response =
            await graphqlClient.query<
                GetPostnummerVedNavnResponse,
                {
                    navn: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: GET_POSTNUMMER_VED_NAVN,

                variables: {

                    navn:
                        normaliserSøgetekst(
                            bynavn,
                        ),

                    virkningstid: VIRKNINGSTID,

                    registreringstid: REGISTRERINGSTID,

                },

            });

        return response.DAR_Postnummer.nodes;

    }

    /**
     * Fallback, når en almindelig søgning ikke finder noget:
     * genkender mønstret "<vejnavn og husnummer> <bynavn>"
     * uden postnummer (fx "Margrethevej 20 Vejle"), slår
     * bynavnet op som postnummer, og søger derefter adressen
     * på vejnavn/husnummer inden for de fundne postnumre.
     */
    private async hentAdresseForslagVedBynavn(
        normaliseretSøgning: string
    ): Promise<AdresseForslag[]> {

        const opdelt =
            normaliseretSøgning.match(
                GADE_OG_BYNAVN_REGEX,
            );

        if (!opdelt) {

            return [];

        }

        const [
            ,
            gadeOgNummer,
            bynavn,
        ] = opdelt;

        const postnumre =
            await this.hentPostnumreVedNavn(
                bynavn,
            );

        if (postnumre.length === 0) {

            return [];

        }

        const response =
            await graphqlClient.query<
                AddressSuggestionResponse,
                {
                    gadeOgNummer: string;
                    postnummerIds: string[];
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: ADDRESS_SUGGESTIONS_VED_POSTNUMRE_QUERY,

                variables: {

                    gadeOgNummer:
                        gadeOgNummer.trim(),

                    postnummerIds:
                        postnumre.map(
                            (postnummer) => postnummer.id_lokalId,
                        ),

                    virkningstid: VIRKNINGSTID,

                    registreringstid: REGISTRERINGSTID,

                },

            });

        return response.DAR_Husnummer.nodes.map(
            mapAdresseForslag
        );

    }

    /**
     * Henter adresseforslag til autocomplete.
     *
     * Matcher primært direkte på adressebetegnelsen (dækker
     * bl.a. søgning på vejnavn og postnummer). Finder det
     * intet, forsøges bynavn i stedet for postnummer, fx
     * "Margrethevej 20 Vejle".
     */
    async hentAdresseForslag(
        search: string
    ): Promise<AdresseForslag[]> {

        const normaliseretSøgning =
            normaliserSøgetekst(
                search,
            );

        const response =
            await graphqlClient.query<
                AddressSuggestionResponse,
                {
                    search: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: ADDRESS_SUGGESTIONS_QUERY,

                variables: {

                    search: normaliseretSøgning,

                    virkningstid: VIRKNINGSTID,

                    registreringstid: REGISTRERINGSTID,

                },

            });

        const forslag =
            response.DAR_Husnummer.nodes.map(
                mapAdresseForslag
            );

        if (forslag.length > 0) {

            return forslag;

        }

        return this.hentAdresseForslagVedBynavn(
            normaliseretSøgning,
        );

    }

}

export const adresseService =
    new AdresseService();
