import { graphqlClient } from "../../clients";

import {
    DarAdressepunktNode,
    GetAdressepunktResponse,
} from "../dar.types";

import { GET_ADRESSEPUNKT } from "../queries/GetAdressepunkt";

export class AdressepunktService {

    /**
     * Henter adressepunkt fra DAR.
     *
     * ID'et kommer fra Husnummerets adgangspunkt.
     */
    async hentAdressepunkt(
        id: string
    ): Promise<DarAdressepunktNode | null> {

        const response =
            await graphqlClient.query<
                GetAdressepunktResponse,
                {
                    id: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "DAR",

                query: GET_ADRESSEPUNKT,

                variables: {

                    id,

                    virkningstid: "9999-12-31T00:00:00Z",

                    registreringstid: "9999-12-31T00:00:00Z",

                },

            });

        return response.DAR_Adressepunkt.nodes[0] ?? null;

    }

}

export const adressepunktService =
    new AdressepunktService();