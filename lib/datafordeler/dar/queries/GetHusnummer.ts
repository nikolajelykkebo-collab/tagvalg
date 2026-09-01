export const GET_HUSNUMMER = /* GraphQL */ `
query GetHusnummer(
    $id: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    DAR_Husnummer(
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
            adgangsadressebetegnelse
            adgangTilBygning
            geoDanmarkBygning
            husnummertekst
            navngivenVej
            postnummer
            kommuneinddeling
            status
            adgangspunkt
        }
    }
}
`;