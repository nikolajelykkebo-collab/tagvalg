import { graphqlClient } from "../../clients";

import {
    DarEjendomsrelationNode,
    GetEjendomsrelationResponse,
} from "../bbr.types";

import {
    GET_EJENDOMSRELATION,
} from "../queries/GetEjendomsrelation";

export class EjendomsrelationService {

    /**
     * Henter en ejendomsrelation fra BBR
     * via ID'et fra BBR_Grund.bestemtFastEjendom.
     */
    async hentEjendomsrelation(
        ejendomsrelationId: string
    ): Promise<DarEjendomsrelationNode> {

        const response =
            await graphqlClient.query<
                GetEjendomsrelationResponse,
                {
                    ejendomsrelationId: string;
                    virkningstid: string;
                    registreringstid: string;
                }
            >({

                endpoint: "BBR",

                query: GET_EJENDOMSRELATION,

                variables: {

                    ejendomsrelationId,

                    virkningstid:
                        "9999-12-31T00:00:00Z",

                    registreringstid:
                        "9999-12-31T00:00:00Z",

                },

            });

        const ejendomsrelation =
            response
                .BBR_Ejendomsrelation
                .nodes[0];

        if (!ejendomsrelation) {

            throw new Error(
                `Ejendomsrelation '${ejendomsrelationId}' blev ikke fundet.`
            );

        }

        return ejendomsrelation;

    }

}

export const ejendomsrelationService =
    new EjendomsrelationService();