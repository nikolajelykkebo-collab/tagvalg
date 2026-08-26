export const GET_GEODANMARK_BYGNING = /* GraphQL */ `
query GetGeoDanmarkBygning(
    $bbrUuid: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    GEODKV_Bygning(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            BBRUUID: {
                eq: $bbrUuid
            }
        }
    ) {
        nodes {
            id_lokalId
            BBRUUID
            bygningstype
            metode3D
            maalestedBygning
            geometristatus
            vertikalNoejagtighed
            planNoejagtighed
            geometri {
                wkt
            }
        }
    }
}
`;
