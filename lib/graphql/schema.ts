export const typeDefs = /* GraphQL */ `
  type AddressSuggestion {
    id: ID!
    text: String!
  }

  type Query {
    addressSuggestions(search: String!): [AddressSuggestion!]!
  }
`;