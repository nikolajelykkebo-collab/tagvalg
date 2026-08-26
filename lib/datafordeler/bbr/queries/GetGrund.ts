export const GET_GRUND = /* GraphQL */ `
query GetGrund(
    $grundId: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    BBR_Grund(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            id_lokalId: {
                eq: $grundId
            }
        }
    ) {
        nodes {
            id_lokalId
            husnummer
            kommunekode
            status
            bestemtFastEjendom
        }
    }
}
`;