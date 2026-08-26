export const GET_BYGNING = /* GraphQL */ `
query GetBygning(
    $bygningId: String!
    $virkningstid: DafDateTime!
    $registreringstid: DafDateTime!
) {
    BBR_Bygning(
        first: 1
        virkningstid: $virkningstid
        registreringstid: $registreringstid
        where: {
            id_lokalId: {
                eq: $bygningId
            }
        }
    ) {
        nodes {
            id_lokalId
            husnummer
            kommunekode

            grund

            byg007Bygningsnummer
            byg021BygningensAnvendelse
            byg026Opfoerelsesaar
            byg033Tagdaekningsmateriale
            byg038SamletBygningsareal
            byg041BebyggetAreal
            byg054AntalEtager
        }
    }
}
`;