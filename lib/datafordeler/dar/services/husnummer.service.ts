import { graphqlClient } from "../../clients";

import {
    DarHusnummerNode,
    GetHusnummerResponse,
} from "../dar.types";

import { GET_HUSNUMMER } from "../queries/GetHusnummer";

export class HusnummerService {

    /**
     * Henter et husnummer fra DAR.
     *
     * ID'et skal være det ID, som DAR_Husnummer
     * forventer for den konkrete husnummer-entitet.
     */
    async hentHusnummer(
        id: string
    ): Promise<DarHusnummerNode> {

        const response =
            await graphqlClient.query<
                GetHusnummerResponse,
                {
                    id: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: GET_HUSNUMMER,

                variables: {

                    id,

                    virkningstid: "9999-12-31T00:00:00Z",

                    registreringstid: "9999-12-31T00:00:00Z",

                },

            });

        const husnummer =
            response.DAR_Husnummer.nodes[0];

        if (!husnummer) {

            throw new Error(
                `Husnummer '${id}' blev ikke fundet.`
            );

        }

        return husnummer;

    }

}

export const husnummerService =
    new HusnummerService();