export const GET_BYGNINGER = /* GraphQL */ `
query GetBygninger(
    $adresseId: UUID!
) {

    bygning(
        where: {
            adgangsadresse: {
                id_lokalId: {
                    eq: $adresseId
                }
            }
        }
    ) {

        nodes {

            id_lokalId

            bygningNummer

            status

            registreringFra

            virkningFra

            opførelsesår

            etageantal

            bebyggetAreal

            samletBygningsareal

            anvendelse {
                kode
                tekst
            }

            tagdækningsmateriale {
                kode
                tekst
            }

        }

    }

}
`;