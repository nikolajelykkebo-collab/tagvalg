"use client";

import {
    useEffect,
    useState,
} from "react";

import { Layers, Info } from "lucide-react";

import {
    useWizard,
} from "../../wizard/hooks/useWizard";

import {
    mapTagtype,
    mapStandardHældning,
} from "../../../lib/datafordeler/bbr/mappers/bbr.mapper";

export default function TagStep() {

    const {
        data,
        opdaterTag,
    } = useWizard();

    const tagtypeFraBbr =
        mapTagtype(
            data.bygning?.tagdækningsmateriale,
        );

    const [tagtype, sætTagtype] =
        useState(
            data.tag?.type
                ?? tagtypeFraBbr,
        );

    const [bebyggetAreal, sætBebyggetAreal] =
        useState(
            data.tag?.areal?.toString()
                ??
            data.bygning?.bebyggetAreal?.toString()
                ??
            "",
        );

    const [hældning, sætHældning] =
        useState(
            data.tag?.hældning?.toString()
                ??
            mapStandardHældning(tagtype)?.toString()
                ?? "",
        );

    const [hældningErRettetAfBruger, sætHældningErRettetAfBruger] =
        useState(
            data.tag?.hældning !== undefined,
        );

    useEffect(() => {

        if (
            data.tag?.areal !== undefined
        ) {
            return;
        }

        if (
            data.bygning?.bebyggetAreal === undefined
        ) {
            return;
        }

        sætBebyggetAreal(
            data.bygning.bebyggetAreal.toString(),
        );

    }, [
        data.tag?.areal,
        data.bygning?.bebyggetAreal,
    ]);

    useEffect(() => {

        // Hold wizard-konteksten i sync med felterne,
        // også når værdierne kun er autoudfyldt.
        opdaterTag({

            ...data.tag,

            type:
                tagtype || undefined,

            areal:
                bebyggetAreal
                    ? Number(bebyggetAreal)
                    : undefined,

            hældning:
                hældning
                    ? Number(hældning)
                    : undefined,

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagtype, bebyggetAreal, hældning]);

    function opdaterTagtype(
        værdi: string,
    ) {

        sætTagtype(
            værdi,
        );

        // Foreslå en typisk hældning for tagtypen,
        // hvis brugeren ikke selv har angivet en.
        const nyHældning =
            hældning
                ? hældning
                : mapStandardHældning(værdi)?.toString()
                    ?? "";

        sætHældning(
            nyHældning,
        );

    }

    function opdaterAreal(
        værdi: string,
    ) {

        sætBebyggetAreal(
            værdi,
        );

    }

    function opdaterHældning(
        værdi: string,
    ) {

        sætHældning(
            værdi,
        );

        sætHældningErRettetAfBruger(
            true,
        );

    }

    return (

        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <Layers className="size-7" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Tag
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Oplysninger om det eksisterende tag.
                    </p>

                </div>

            </div>

            <div className="space-y-6">

                {/* Nuværende tagtype */}

                <div>

                    <label
                        htmlFor="tagtype"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Nuværende tagtype
                    </label>

                    <select
                        id="tagtype"
                        value={tagtype}
                        onChange={(event) =>
                            opdaterTagtype(
                                event.target.value,
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >

                        <option value="">
                            Vælg tagtype
                        </option>

                        <option value="tagpap">
                            Tagpap
                        </option>

                        <option value="eternit">
                            Eternit
                        </option>

                        <option value="betontegl">
                            Betontegl
                        </option>

                        <option value="tegltag">
                            Tegl
                        </option>

                        <option value="ståltag">
                            Stål
                        </option>

                        <option value="stråtag">
                            Stråtag
                        </option>

                        <option value="andet">
                            Andet
                        </option>

                    </select>

                </div>

                {/* Bebygget areal */}

                <div>

                    <label
                        htmlFor="bebygget-areal"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Bebygget areal
                    </label>

                    <div className="flex items-center gap-2">

                        <input
                            id="bebygget-areal"
                            type="number"
                            min="0"
                            step="1"
                            value={bebyggetAreal}
                            onChange={(event) =>
                                opdaterAreal(
                                    event.target.value,
                                )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />

                        <span className="shrink-0 text-sm text-slate-500">
                            m²
                        </span>

                    </div>

                    <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                        <Info className="mt-0.5 size-3.5 shrink-0" />
                        Hvis det bebyggede areal indeholder
                        bygninger, der ikke skal have skiftet
                        tag, bør du tilpasse arealet tilsvarende.
                    </p>

                </div>

                {/* Tagets hældning */}

                <div>

                    <label
                        htmlFor="tag-haeldning"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Tagets hældning
                    </label>

                    <div className="flex items-center gap-2">

                        <input
                            id="tag-haeldning"
                            type="number"
                            min="0"
                            max="90"
                            step="1"
                            value={hældning}
                            onChange={(event) =>
                                opdaterHældning(
                                    event.target.value,
                                )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />

                        <span className="shrink-0 text-sm text-slate-500">
                            grader
                        </span>

                    </div>

                    {!hældningErRettetAfBruger && hældning && (

                        <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                            <Info className="mt-0.5 size-3.5 shrink-0" />
                            Dette er et estimat baseret på den
                            valgte tagtype. Ret værdien, hvis du
                            kender den faktiske hældning.
                        </p>

                    )}

                </div>

            </div>

        </section>

    );

}
