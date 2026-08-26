export const GET_EJENDOMSRELATION = /* GraphQL */ `
query GetEjendomsrelation(
    $ejendomsrelationId: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    BBR_Ejendomsrelation(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            id_lokalId: {
                eq: $ejendomsrelationId
            }
        }
    ) {
        nodes {
            id_lokalId
            bfeNummer
            ejendomsnummer
            ejendomstype
            samletFastEjendom
            kommunekode
            status
        }
    }
}
`;