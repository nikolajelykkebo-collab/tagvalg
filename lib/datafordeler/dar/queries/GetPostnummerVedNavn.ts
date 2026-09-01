export const GET_POSTNUMMER_VED_NAVN = /* GraphQL */ `
query GetPostnummerVedNavn(
    $navn: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Postnummer(
        first: 10
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            navn: {
                startsWith: $navn
            }
        }
    ) {
        nodes {
            id_lokalId
            navn
        }
    }
}
`;
