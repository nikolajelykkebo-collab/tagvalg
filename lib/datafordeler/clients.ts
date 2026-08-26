import { datafordelerConfig } from "./config";

export type GraphQLEndpoint = "DAR" | "BBR" | "GEODKV";

const ENDPOINT_LOG_LABEL: Record<GraphQLEndpoint, string> = {
    DAR: "DAR",
    BBR: "BBR",
    GEODKV: "GEODANMARK",
};

export interface GraphQLRequest<TVariables> {
    endpoint: GraphQLEndpoint;
    query: string;
    variables?: TVariables;
}

interface GraphQLError {
    message: string;
}

interface GraphQLResponse<TResult> {
    data?: TResult;
    errors?: GraphQLError[];
}

export class GraphQLClient {

    async query<TResult, TVariables = undefined>(
        request: GraphQLRequest<TVariables>
    ): Promise<TResult> {

        const endpoint =
            request.endpoint === "DAR"
                ? datafordelerConfig.darUrl
                : request.endpoint === "BBR"
                    ? datafordelerConfig.bbrUrl
                    : datafordelerConfig.geodkvUrl;

        const url = new URL(endpoint);
        url.searchParams.set("apiKey", datafordelerConfig.apiKey);

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 30000);

        const logLabel = ENDPOINT_LOG_LABEL[request.endpoint];

        try {

            console.log(`========== DATAFORDELER ${logLabel} REQUEST ==========`);
            console.log("URL:", url.toString());
            console.log("Request:", JSON.stringify({
                query: request.query,
                variables: request.variables
            }, null, 2));

            const response = await fetch(url.toString(), {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/graphql-response+json, application/json"
                },

                body: JSON.stringify({
                    query: request.query,
                    variables: request.variables
                }),

                signal: controller.signal
            });

            const responseText = await response.text();

            console.log(`========== DATAFORDELER ${logLabel} RESPONSE ==========`);
            console.log("HTTP Status:", response.status);
            console.log("HTTP StatusText:", response.statusText);
            console.log("Response Headers:", Object.fromEntries(response.headers.entries()));
            console.log("Response Body:");
            console.log(responseText);


            if (!response.ok) {
                throw new Error(
                    `GraphQL request failed (${response.status}) ${response.statusText}\n\n${responseText}`
                );
            }

            const result =
                JSON.parse(responseText) as GraphQLResponse<TResult>;

            if (result.errors?.length) {

                throw new Error(
                    result.errors
                        .map(error => error.message)
                        .join("\n")
                );

            }

            if (!result.data) {
                throw new Error("GraphQL returned no data.");
            }

            return result.data;

        } catch (error) {

            if (error instanceof Error && error.name === "AbortError") {
                throw new Error("GraphQL request timed out.");
            }

            throw error;

        } finally {

            clearTimeout(timeout);

        }

    }

}

export const graphqlClient = new GraphQLClient();