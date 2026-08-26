import { graphqlClient } from "../../clients";

import {
    GeoDanmarkBygningNode,
    GetGeoDanmarkBygningResponse,
} from "../geodanmark.types";

import { GET_GEODANMARK_BYGNING } from "../queries/GetBygning";

export class GeoDanmarkBygningService {

    /**
     * Henter en GeoDanmark-bygning via BBR_Bygning.id_lokalId (BBRUUID).
     * Returnerer null, hvis der ikke findes en tilsvarende GeoDanmark-bygning.
     */
    async hentBygningVedBbrUuid(
        bbrUuid: string
    ): Promise<GeoDanmarkBygningNode | null> {

        const response =
            await graphqlClient.query<
                GetGeoDanmarkBygningResponse,
                {
                    bbrUuid: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "GEODKV",

                query: GET_GEODANMARK_BYGNING,

                variables: {

                    bbrUuid,

                    virkningstid:
                        "9999-12-31T00:00:00Z",

                    registreringstid:
                        "9999-12-31T00:00:00Z",

                },

            });

        const bygning =
            response.GEODKV_Bygning.nodes[0]
                ?? null;

        console.log(
            "========== DATAFORDELER GEODANMARK BYGNING =========="
        );

        console.log(
            JSON.stringify(
                bygning,
                null,
                2
            )
        );

        return bygning;

    }

}

export const geodanmarkBygningService =
    new GeoDanmarkBygningService();
