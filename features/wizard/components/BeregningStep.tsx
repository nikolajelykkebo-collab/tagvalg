"use client";

import {
    useEffect,
    useState,
} from "react";

import { Calculator, Info } from "lucide-react";

import { useWizard } from "../hooks/useWizard";

import {
    TAGPRIS_PR_KVADRATMETER,
    TAGPRIS_INTERVAL_PR_KVADRATMETER,
    TAGTYPE_LABELS,
} from "../constants/tagpriser";

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

            <div>

                <label
                    htmlFor="onsket-tagtype"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                >
                    Ønsket nyt tag
                </label>

                <select
                    id="onsket-tagtype"
                    value={valgtTagtype}
                    onChange={(event) =>
                        sætValgtTagtype(
                            event.target.value,
                        )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >

                    <option value="">
                        Vælg tagtype
                    </option>

                    {Object.entries(TAGTYPE_LABELS).map(
                        ([kode, label]) => (

                            <option
                                key={kode}
                                value={kode}
                            >
                                {label} (
                                {TAGPRIS_PR_KVADRATMETER[kode]} kr./m²
                                )
                            </option>

                        ),
                    )}

                </select>

            </div>

        </section>

    );

}
