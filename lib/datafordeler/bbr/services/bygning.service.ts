import { graphqlClient } from "../../clients";

import {
    DarBygningNode,
    GetBygningResponse,
} from "../bbr.types";

import { GET_BYGNING } from "../queries/GetBygning";

export class BygningService {

    /**
     * Henter en bygning fra BBR
     * via bygningens ID.
     */
    async hentBygning(
        bygningId: string
    ): Promise<DarBygningNode> {

        const response =
            await graphqlClient.query<
                GetBygningResponse,
                {
                    bygningId: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "BBR",

                query: GET_BYGNING,

                variables: {

                    bygningId,

                    virkningstid:
                        "9999-12-31T00:00:00Z",

                    registreringstid:
                        "9999-12-31T00:00:00Z",

                },

            });

        const bygning =
            response.BBR_Bygning.nodes[0];

        if (!bygning) {

            throw new Error(
                `Bygning '${bygningId}' blev ikke fundet.`
            );

        }

        return bygning;

    }

}

export const bygningService =
    new BygningService();