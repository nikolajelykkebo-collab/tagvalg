export const GET_ADRESSE = /* GraphQL */ `
query GetAdresse(
    $adressebetegnelse: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Adresse(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            adressebetegnelse: {
                eq: $adressebetegnelse
            }
        }
    ) {
        nodes {
            id_lokalId
            id_namespace
            adressebetegnelse
            husnummer
            status
            virkningFra
            virkningTil
            registreringFra
            registreringTil
        }
    }
}
`;