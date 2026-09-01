"use client";

import type { FormEvent } from "react";

import { Home, Loader2, TriangleAlert } from "lucide-react";

import AddressInput from "./AddressInput";
import AddressSuggestions from "./AddressSuggestions";

import { useWizard } from "../../wizard/hooks/useWizard";

import type { AdresseForslag } from "../types";
import type { AdresseResultat } from "../services/address.service";
import type { AdresseSøgning } from "../hooks/useAddress";

interface Props {
    adresseSøgning: AdresseSøgning;
}

export default function AddressStep({
    adresseSøgning,
}: Props) {

    const {
        adresse,
        forslag,
        indlæser,
        fejl,
        opdaterAdresse,
        vælgAdresse,
        søgOgVælgAdresse,
    } = adresseSøgning;

    const {
        opdaterAdresse: gemAdresse,
        opdaterBygning: gemBygning,
        opdaterEjendom: gemEjendom,
        næsteTrin,
    } = useWizard();

    function gemOgFortsæt(
        resultat: AdresseResultat,
    ) {

        gemAdresse(
            resultat.adresse,
        );

        if (resultat.bygning) {

            gemBygning(
                resultat.bygning,
            );

        }

        if (resultat.ejendom) {

            gemEjendom(
                resultat.ejendom,
            );

        }

        næsteTrin();

    }

    async function håndterAdresseValg(
        forslag: AdresseForslag,
    ) {

        try {

            const resultat =
                await vælgAdresse(
                    forslag,
                );

            gemOgFortsæt(
                resultat,
            );

        } catch (error) {

            console.error(
                error,
            );

        }

    }

    async function håndterSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();

        if (!adresse.trim()) {
            return;
        }

        try {

            // Brugeren har ikke valgt et forslag fra
            // dropdown-listen, så vi slår den indtastede
            // tekst op direkte mod DAR.
            const resultat =
                await søgOgVælgAdresse();

            gemOgFortsæt(
                resultat,
            );

        } catch (error) {

            // Fejlen er allerede gemt via useAddress
            // og vises til brugeren under feltet.
            console.error(
                error,
            );

        }

    }

    return (

        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <Home className="size-7" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Find din adresse
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Start med at søge efter din adresse, så
                        henter vi automatisk oplysninger om din bolig.
                    </p>

                </div>

            </div>

            <form onSubmit={håndterSubmit}>

                <AddressInput
                    værdi={adresse}
                    vedÆndring={opdaterAdresse}
                />

            </form>

            {fejl && (

                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
                    <TriangleAlert className="size-4 shrink-0" />
                    {fejl}
                </div>

            )}

            <AddressSuggestions
                forslag={forslag}
                vedValg={håndterAdresseValg}
            />

            {indlæser && (

                <p className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="size-4 animate-spin" />
                    Henter adresse...
                </p>

            )}

        </section>

    );

}
