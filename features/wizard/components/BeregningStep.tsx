"use client";

import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { Calculator, Info } from "lucide-react";

import { useWizard } from "../hooks/useWizard";

import {
    TAGPRIS_PR_KVADRATMETER,
    TAGPRIS_INTERVAL_PR_KVADRATMETER,
    TAGTYPE_LABELS,
} from "../constants/tagpriser";

import { sporFeltUdfyldt } from "../lib/analytics";
import { Trin } from "../types";

type TagtypeIkonProps = {
    className?: string;
};

/**
 * Fælles tag-silhuet (tagflade + rygning), som de enkelte
 * tagtype-ikoner tegner deres materiale-mønster oven på.
 */
function TagtypeIkonSkabelon(
    { className, children }: TagtypeIkonProps & { children: ReactNode },
) {

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M3 18h18" />
            <path d="M4 18 12 7l8 11" />
            {children}
        </svg>
    );

}

function TagpapIkon(
    { className }: TagtypeIkonProps,
) {

    // Vandrette baner, som tagpap lægges i.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M9.8 10h4.4" />
            <path strokeWidth={1.5} d="M8 12.5h8" />
            <path strokeWidth={1.5} d="M6.2 15h11.6" />
        </TagtypeIkonSkabelon>
    );

}

function StålIkon(
    { className }: TagtypeIkonProps,
) {

    // Lodrette, ensartede false på en metalplade.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M8 18v-5.5" />
            <path strokeWidth={1.5} d="M12 18V7" />
            <path strokeWidth={1.5} d="M16 18v-5.5" />
        </TagtypeIkonSkabelon>
    );

}

function EternitIkon(
    { className }: TagtypeIkonProps,
) {

    // Bølget, riflet mønster som eternitplader.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M6.2 15q1.45 -1.8 2.9 0t2.9 0t2.9 0" />
            <path strokeWidth={1.5} d="M9.8 10q1.1 -1.3 2.2 0" />
        </TagtypeIkonSkabelon>
    );

}

function BetonteglIkon(
    { className }: TagtypeIkonProps,
) {

    // Fladt, ensartet tegl-mønster i lige rækker.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M9.8 10h4.4" />
            <path strokeWidth={1.5} d="M8 12.5h8" />
            <path strokeWidth={1.5} d="M6.2 15h11.6" />
            <path strokeWidth={1.5} d="M12 12.5v2.5" />
            <path strokeWidth={1.5} d="M9.9 10v2.5" />
            <path strokeWidth={1.5} d="M14.1 10v2.5" />
        </TagtypeIkonSkabelon>
    );

}

function TegltagIkon(
    { className }: TagtypeIkonProps,
) {

    // Bølget tegl-mønster af overlappende tagsten.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M6.2 15a1.45 1.45 0 0 0 2.9 0a1.45 1.45 0 0 1 2.9 0a1.45 1.45 0 0 1 2.9 0" />
            <path strokeWidth={1.5} d="M8 12.5a1.1 1.1 0 0 0 2.2 0a1.1 1.1 0 0 1 2.2 0a1.1 1.1 0 0 1 2.2 0" />
        </TagtypeIkonSkabelon>
    );

}

function StråtagIkon(
    { className }: TagtypeIkonProps,
) {

    // Struktureret halm-tekstur af korte, tætte strå.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M7 16.5v-3.5" />
            <path strokeWidth={1.5} d="M9 15.5v-3.5" />
            <path strokeWidth={1.5} d="M11 15v-4" />
            <path strokeWidth={1.5} d="M13 15v-4" />
            <path strokeWidth={1.5} d="M15 15.5v-3.5" />
            <path strokeWidth={1.5} d="M17 16.5v-3.5" />
        </TagtypeIkonSkabelon>
    );

}

function NaturskiferIkon(
    { className }: TagtypeIkonProps,
) {

    // Forskudt skifer-/flisemønster.
    return (
        <TagtypeIkonSkabelon className={className}>
            <path strokeWidth={1.5} d="M7 15.5h3.4M12.3 15.5h3.4" />
            <path strokeWidth={1.5} d="M8.7 12.7h3.4M13.9 12.7h2.2" />
            <path strokeWidth={1.5} d="M10.3 10.1h3" />
        </TagtypeIkonSkabelon>
    );

}

const TAGTYPE_KORT = [

    { værdi: "tagpap", Ikon: TagpapIkon },
    { værdi: "ståltag", Ikon: StålIkon },
    { værdi: "eternit", Ikon: EternitIkon },
    { værdi: "betontegl", Ikon: BetonteglIkon },
    { værdi: "tegltag", Ikon: TegltagIkon },
    { værdi: "stråtag", Ikon: StråtagIkon },
    { værdi: "naturskifer", Ikon: NaturskiferIkon },

] as const;

export default function BeregningStep() {

    const {
        data,
        opdaterBeregning,
    } = useWizard();

    const areal =
        data.tag?.areal;

    const hældning =
        data.tag?.hældning;

    const autoTagareal =
        areal !== undefined
            ? areal / Math.cos(((hældning ?? 0) * Math.PI) / 180)
            : undefined;

    const [tagareal, sætTagareal] =
        useState(
            autoTagareal !== undefined
                ? autoTagareal.toFixed(2)
                : data.beregning?.tagareal !== undefined
                ? data.beregning.tagareal.toFixed(2)
                : "",
        );

    const [tagarealErRettetAfBruger, sætTagarealErRettetAfBruger] =
        useState(false);

    const [valgtTagtype, sætValgtTagtype] =
        useState(
            data.beregning?.valgtTagtype
                ?? "",
        );

    useEffect(() => {

        // Genberegn altid, når bebygget areal eller hældning
        // ændres i et tidligere trin.
        sætTagarealErRettetAfBruger(
            false,
        );

        sætTagareal(
            autoTagareal !== undefined
                ? autoTagareal.toFixed(2)
                : "",
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areal, hældning]);


    useEffect(() => {

        const tagarealSomTal =
            tagareal
                ? Number(tagareal)
                : undefined;

        if (
            tagarealSomTal === undefined
        ) {
            return;
        }

        const prisPrKvadratmeter =
            valgtTagtype
                ? TAGPRIS_PR_KVADRATMETER[valgtTagtype]
                : undefined;

        const prisinterval =
            valgtTagtype
                ? TAGPRIS_INTERVAL_PR_KVADRATMETER[valgtTagtype]
                : undefined;

        const pris =
            prisPrKvadratmeter
                ? tagarealSomTal * prisPrKvadratmeter
                : undefined;

        const prisMin =
            prisinterval
                ? tagarealSomTal * prisinterval.min
                : undefined;

        const prisMax =
            prisinterval
                ? tagarealSomTal * prisinterval.max
                : undefined;

        opdaterBeregning({

            ...data.beregning,

            tagareal:
                tagarealSomTal,

            valgtTagtype:
                valgtTagtype || undefined,

            prisPrKvadratmeter,

            pris,

            prisMin,

            prisMax,

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagareal, valgtTagtype]);

    function opdaterTagareal(
        værdi: string,
    ) {

        sætTagareal(
            værdi,
        );

        sætTagarealErRettetAfBruger(
            true,
        );

    }

    function opdaterValgtTagtype(
        værdi: string,
    ) {

        sætValgtTagtype(
            værdi,
        );

        sporFeltUdfyldt(
            "valgt_tagtype",
            Trin.Beregning,
        );

    }

    return (

        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <Calculator className="size-7" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Beregning
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Tagets areal beregnet ud fra det
                        bebyggede areal og tagets hældning.
                    </p>

                </div>

            </div>

            <div>

                <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Vælg tagtype
                </label>

                <p className="mb-3 text-sm text-slate-500">
                    Vælg den tagtype du ønsker at beregne pris på.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

                    {TAGTYPE_KORT.map(({ værdi, Ikon }) => {

                        const erValgt =
                            valgtTagtype === værdi;

                        return (

                            <button
                                key={værdi}
                                type="button"
                                aria-pressed={erValgt}
                                onClick={() =>
                                    opdaterValgtTagtype(
                                        værdi,
                                    )
                                }
                                className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-center transition-colors ${
                                    erValgt
                                        ? "border-emerald-600 bg-emerald-50"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >

                                <Ikon
                                    className={`size-8 ${
                                        erValgt
                                            ? "text-emerald-700"
                                            : "text-slate-400"
                                    }`}
                                />

                                <span
                                    className={`text-sm font-semibold ${
                                        erValgt
                                            ? "text-emerald-900"
                                            : "text-slate-900"
                                    }`}
                                >
                                    {TAGTYPE_LABELS[værdi]}
                                </span>

                            </button>

                        );

                    })}

                </div>

            </div>

            <div>

                <label
                    htmlFor="tagareal"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                >
                    Tagets areal
                </label>

                <div className="flex items-center gap-2">

                    <input
                        id="tagareal"
                        type="number"
                        min="0"
                        step="0.01"
                        value={tagareal}
                        onChange={(event) =>
                            opdaterTagareal(
                                event.target.value,
                            )
                        }
                        onBlur={() =>
                            sporFeltUdfyldt(
                                "tagareal",
                                Trin.Beregning,
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <span className="shrink-0 text-sm text-slate-500">
                        m²
                    </span>

                </div>

                {!tagarealErRettetAfBruger && tagareal && (

                    <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                        <Info className="mt-0.5 size-3.5 shrink-0" />
                        Beregnet automatisk ud fra bebygget
                        areal divideret med cosinus til
                        hældningen. Ret værdien, hvis du
                        kender det faktiske tagareal.
                    </p>

                )}

            </div>

        </section>

    );

}
