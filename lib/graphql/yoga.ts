import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

console.log("typeDefs:", typeDefs);
console.log("resolvers:", resolvers);

let schema;

try {
  schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  console.log("Schema oprettet");
} catch (fejl) {
  console.error("Schema fejl:", fejl);
  throw fejl;
}

export const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: true,
});