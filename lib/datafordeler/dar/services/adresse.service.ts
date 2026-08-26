import { graphqlClient } from "../../clients";

import {
    AdresseForslag,
    AddressSuggestionResponse,
    DarAdresseNode,
    GetAdresseResponse,
} from "../dar.types";

import { mapAdresseForslag } from "../mappers/adresse.mapper";

import { ADDRESS_SUGGESTIONS_QUERY } from "../queries/AdressSuggestions";
import { GET_ADRESSE } from "../queries/GetAdresse";

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

                    virkningstid: "9999-12-31T00:00:00Z",

                    registreringstid: "9999-12-31T00:00:00Z",

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
     * Henter adresseforslag til autocomplete.
     */
    async hentAdresseForslag(
        search: string
    ): Promise<AdresseForslag[]> {

        // Datafordeler søger case-sensitivt.
        // Normaliser første bogstav til stort.
        const normaliseretSøgning =
            search.trim().length === 0
                ? search
                : search.charAt(0).toUpperCase() +
                  search.slice(1).toLowerCase();

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

                    virkningstid: "9999-12-31T00:00:00Z",

                    registreringstid: "9999-12-31T00:00:00Z",

                },

            });

        return response.DAR_Husnummer.nodes.map(
            mapAdresseForslag
        );

    }

}

export const adresseService =
    new AdresseService();