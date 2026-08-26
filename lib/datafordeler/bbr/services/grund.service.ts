import { graphqlClient } from "../../clients";

import {
    DarGrundNode,
    GetGrundResponse,
} from "../bbr.types";

import { GET_GRUND } from "../queries/GetGrund";

export class GrundService {

    /**
     * Henter en grund fra BBR
     * via Grund-ID'et fra BBR_Bygning.
     */
    async hentGrund(
        grundId: string
    ): Promise<DarGrundNode> {

        const response =
            await graphqlClient.query<
                GetGrundResponse,
                {
                    grundId: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "BBR",

                query: GET_GRUND,

                variables: {

                    grundId,

                    virkningstid:
                        "9999-12-31T00:00:00Z",

                    registreringstid:
                        "9999-12-31T00:00:00Z",

                },

            });

        const grund =
            response.BBR_Grund.nodes[0];

        if (!grund) {

            throw new Error(
                `Grund '${grundId}' blev ikke fundet.`
            );

        }

        return grund;

    }

}

export const grundService =
    new GrundService();