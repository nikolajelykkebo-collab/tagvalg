export const ADDRESS_SUGGESTIONS_QUERY = /* GraphQL */ `
query AddressSuggestions(
    $search: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Husnummer(
        first: 10
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            adgangsadressebetegnelse: {
                startsWith: $search
            }
        }
    ) {
        nodes {
            id_lokalId
            adgangsadressebetegnelse
            status
        }
    }
}
`;