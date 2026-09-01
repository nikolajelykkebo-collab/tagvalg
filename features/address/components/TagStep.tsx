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

import { sporFeltUdfyldt } from "../../wizard/lib/analytics";
import { Trin } from "../../wizard/types";

type HældningIkonProps = {
    className?: string;
};

function FladtTagIkon(
    { className }: HældningIkonProps,
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
            <path d="M5 18l3-3h8l3 3" />
        </svg>
    );

}

function MiddelTagIkon(
    { className }: HældningIkonProps,
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
            <path d="M4 18 12 8l8 10" />
        </svg>
    );

}

function HøjTagIkon(
    { className }: HældningIkonProps,
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
            <path d="M5 18 12 3l7 15" />
        </svg>
    );

}

const HÆLDNING_VALG = [

    {
        værdi: 3,
        label: "Fladt tag",
        beskrivelse: "0-5 grader",
        Ikon: FladtTagIkon,
    },

    {
        værdi: 25,
        label: "Middel",
        beskrivelse: "Cirka 25 grader",
        Ikon: MiddelTagIkon,
    },

    {
        værdi: 45,
        label: "Høj",
        beskrivelse: "Cirka 45 grader",
        Ikon: HøjTagIkon,
    },

] as const;

/**
 * Runder en rå hældning (fx et BBR-estimat) af til den nærmeste
 * af de tre valgbare hældningskort.
 */
function nærmesteHældningValg(
    rå: number | undefined,
): number | undefined {

    if (rå === undefined) {

        return undefined;

    }

    return HÆLDNING_VALG.reduce<number>(
        (nærmest, valg) =>
            Math.abs(valg.værdi - rå) < Math.abs(nærmest - rå)
                ? valg.værdi
                : nærmest,
        HÆLDNING_VALG[0].værdi,
    );

}

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
        useState<number | undefined>(
            () =>
                data.tag?.hældning !== undefined
                    ? nærmesteHældningValg(data.tag.hældning)
                    : nærmesteHældningValg(mapStandardHældning(tagtype)),
        );

    const [tilstand, sætTilstand] =
        useState(
            data.tag?.tilstand
                ?? "",
        );

    const [tidshorisont, sætTidshorisont] =
        useState(
            data.tag?.tidshorisont
                ?? "",
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

            hældning,

            tilstand:
                tilstand || undefined,

            tidshorisont:
                tidshorisont || undefined,

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagtype, bebyggetAreal, hældning, tilstand, tidshorisont]);

    function opdaterTagtype(
        værdi: string,
    ) {

        sætTagtype(
            værdi,
        );

        sporFeltUdfyldt(
            "tagtype",
            Trin.Tag,
        );

        // Foreslå en typisk hældning for tagtypen,
        // hvis brugeren ikke selv har angivet en.
        const nyHældning =
            hældning !== undefined
                ? hældning
                : nærmesteHældningValg(
                    mapStandardHældning(værdi),
                );

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
        værdi: number,
    ) {

        sætHældning(
            værdi,
        );

        sporFeltUdfyldt(
            "haeldning",
            Trin.Tag,
        );

    }

    function opdaterTilstand(
        værdi: string,
    ) {

        sætTilstand(
            værdi,
        );

        sporFeltUdfyldt(
            "tilstand",
            Trin.Tag,
        );

    }

    function opdaterTidshorisont(
        værdi: string,
    ) {

        sætTidshorisont(
            værdi,
        );

        sporFeltUdfyldt(
            "tidshorisont",
            Trin.Tag,
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
                            onBlur={() =>
                                sporFeltUdfyldt(
                                    "bebygget_areal",
                                    Trin.Tag,
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

                    <label className="mb-1 block text-sm font-semibold text-slate-900">
                        Din boligs tagvinkel
                    </label>

                    <p className="mb-3 text-sm text-slate-500">
                        Vi har automatisk beregnet din tagvinkel.
                        Er den ikke korrekt skal du rette den til
                        den korrekte vinkel.
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                        {HÆLDNING_VALG.map(({ værdi, label, beskrivelse, Ikon }) => {

                            const erValgt =
                                hældning === værdi;

                            return (

                                <button
                                    key={værdi}
                                    type="button"
                                    aria-pressed={erValgt}
                                    onClick={() =>
                                        opdaterHældning(
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
                                        {label}
                                    </span>

                                    <span
                                        className={`text-xs ${
                                            erValgt
                                                ? "text-emerald-700"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        {beskrivelse}
                                    </span>

                                </button>

                            );

                        })}

                    </div>

                </div>

                {/* Tagets tilstand */}

                <div>

                    <label
                        htmlFor="tag-tilstand"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Hvordan er tagets tilstand?
                    </label>

                    <select
                        id="tag-tilstand"
                        value={tilstand}
                        onChange={(event) =>
                            opdaterTilstand(
                                event.target.value,
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >

                        <option value="">
                            Vælg tagets tilstand
                        </option>

                        <option value="Akut skade">
                            Akut skade
                        </option>

                        <option value="Slidt">
                            Slidt
                        </option>

                        <option value="Forebyggende">
                            Forebyggende
                        </option>

                    </select>

                </div>

                {/* Tidshorisont */}

                <div>

                    <label
                        htmlFor="tag-tidshorisont"
                        className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                        Hvornår regner du med at gå i gang?
                    </label>

                    <select
                        id="tag-tidshorisont"
                        value={tidshorisont}
                        onChange={(event) =>
                            opdaterTidshorisont(
                                event.target.value,
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >

                        <option value="">
                            Vælg tidshorisont
                        </option>

                        <option value="Under 1 md">
                            Under 1 md
                        </option>

                        <option value="1-3 mdr">
                            1-3 mdr
                        </option>

                        <option value="3-6 mdr">
                            3-6 mdr
                        </option>

                        <option value="Senere">
                            Senere
                        </option>

                    </select>

                </div>

            </div>

        </section>

    );

}
