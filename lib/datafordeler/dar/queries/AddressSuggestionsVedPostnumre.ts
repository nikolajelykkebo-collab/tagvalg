export const ADDRESS_SUGGESTIONS_VED_POSTNUMRE_QUERY = /* GraphQL */ `
query AddressSuggestionsVedPostnumre(
    $gadeOgNummer: String!
    $postnummerIds: [String!]!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Husnummer(
        first: 10
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            adgangsadressebetegnelse: {
                startsWith: $gadeOgNummer
            }
            postnummer: {
                in: $postnummerIds
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
