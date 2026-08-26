export const GET_ADRESSEPUNKT = /* GraphQL */ `
query GetAdressepunkt(
    $id: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Adressepunkt(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            id_lokalId: {
                eq: $id
            }
        }
    ) {
        nodes {
            id_lokalId
            position {
                type
                crs
                dimension
                wkt
            }
        }
    }
}
`;