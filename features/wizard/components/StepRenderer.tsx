"use client";

import AddressStep from "../../../features/address/components/AddressStep";
import TagStep from "../../../features/address/components/TagStep";

import EjendomStep from "./EjendomStep";
import BeregningStep from "./BeregningStep";
import KontaktStep from "./KontaktStep";
import ResultatStep from "./ResultatStep";

import { Trin } from "../types";

interface Props {
    aktivtTrin: Trin;
}

export default function StepRenderer({
    aktivtTrin,
}: Props) {

    switch (aktivtTrin) {

        case Trin.Adresse:

            return <AddressStep />;

        case Trin.Ejendom:

            return <EjendomStep />;

        case Trin.Tag:

            return <TagStep />;

        case Trin.Beregning:

            return <BeregningStep />;

        case Trin.Kontakt:

            return <KontaktStep />;

        case Trin.Resultat:

            return <ResultatStep />;

        default:

            return (
                <div>
                    Trinnet er ikke implementeret endnu.
                </div>
            );

    }

}