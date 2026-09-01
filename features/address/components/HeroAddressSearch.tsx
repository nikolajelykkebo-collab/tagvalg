"use client";

import type { FormEvent } from "react";

import { useRouter } from "next/navigation";

import { Loader2, Search, TriangleAlert } from "lucide-react";

import { useAddress } from "../hooks/useAddress";
import { useWizard } from "../../wizard/hooks/useWizard";
import { Trin } from "../../wizard/types";

import type { AdresseForslag } from "../types";
import type { AdresseResultat } from "../services/address.service";

export default function HeroAddressSearch() {

    const router =
        useRouter();

    const {
        adresse,
        forslag,
        indlæser,
        fejl,
        opdaterAdresse,
        vælgAdresse,
        søgOgVælgAdresse,
    } = useAddress();

    const {
        opdaterAdresse: gemAdresse,
        opdaterBygning: gemBygning,
        opdaterEjendom: gemEjendom,
        gåTilTrin,
    } = useWizard();

    function gemOgGåVidere(
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

        // Adressen er allerede fundet, så vi springer
        // Adresse-trinnet over og fortsætter direkte
        // til Ejendom-trinnet i wizarden.
        gåTilTrin(
            Trin.Ejendom,
        );

        router.push(
            "/beregner",
        );

    }

    async function håndterAdresseValg(
        valgtForslag: AdresseForslag,
    ) {

        try {

            const resultat =
                await vælgAdresse(
                    valgtForslag,
                );

            gemOgGåVidere(
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

            gemOgGåVidere(
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

        <div className="relative">

            <form onSubmit={håndterSubmit}>

                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-colors focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-100 sm:flex-row">

                    <input
                        type="text"
                        value={adresse}
                        onChange={(event) =>
                            opdaterAdresse(
                                event.target.value,
                            )
                        }
                        placeholder="Indtast din adresse, fx Vestergade 12, Vejle"
                        className="w-full flex-1 bg-white px-5 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={indlæser || !adresse.trim()}
                        className="flex items-center justify-center gap-2 bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {indlæser ? "Søger..." : "Beregn pris →"}
                    </button>

                </div>

            </form>

            {forslag.length > 0 && (

                <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-lg">

                    {forslag.map((valgmulighed) => (

                        <li key={valgmulighed.id}>

                            <button
                                type="button"
                                onClick={() =>
                                    håndterAdresseValg(
                                        valgmulighed,
                                    )
                                }
                                className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-3 text-left text-sm text-gray-700 transition-colors last:border-b-0 hover:bg-emerald-50"
                            >
                                <Search className="size-4 shrink-0 text-gray-400" />
                                {valgmulighed.tekst}
                            </button>

                        </li>

                    ))}

                </ul>

            )}

            {indlæser && (

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="size-4 animate-spin" />
                    Henter adresse...
                </p>

            )}

            {fejl && (

                <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <TriangleAlert className="size-4 shrink-0" />
                    {fejl}
                </p>

            )}

        </div>

    );

}
