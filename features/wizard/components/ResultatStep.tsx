"use client";

import { PartyPopper, MapPin, Layers, Calculator } from "lucide-react";

import { useWizard } from "../hooks/useWizard";

import { TAGTYPE_LABELS } from "../constants/tagpriser";

export default function ResultatStep() {

    const {
        data,
    } = useWizard();

    return (

        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <PartyPopper className="size-7" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Resultat
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Opsummering af dit tagprojekt.
                    </p>

                </div>

            </div>

            <div className="rounded-xl border border-slate-200 p-4">

                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <MapPin className="size-4 text-slate-400" />
                    Adresse
                </h3>

                <p className="mt-2 text-slate-700">
                    {data.adresse?.tekst
                        ?? "Ingen adresse valgt."}
                </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-4">

                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <Layers className="size-4 text-slate-400" />
                    Tag
                </h3>

                <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">

                    <div className="flex justify-between border-b border-slate-100 py-1.5 text-sm sm:justify-start sm:gap-2">
                        <dt className="text-slate-500">Tagtype</dt>
                        <dd className="font-medium text-slate-900">{data.tag?.type ?? "-"}</dd>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 py-1.5 text-sm sm:justify-start sm:gap-2">
                        <dt className="text-slate-500">Hældning</dt>
                        <dd className="font-medium text-slate-900">{data.tag?.hældning ?? "-"} grader</dd>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 py-1.5 text-sm sm:justify-start sm:gap-2">
                        <dt className="text-slate-500">Bebygget areal</dt>
                        <dd className="font-medium text-slate-900">{data.tag?.areal ?? "-"} m²</dd>
                    </div>

                </dl>

            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                <h3 className="flex items-center gap-2 font-semibold text-blue-900">
                    <Calculator className="size-4" />
                    Beregning
                </h3>

                <dl className="mt-3 space-y-2">

                    <div className="flex justify-between text-sm">
                        <dt className="text-blue-800/80">Tagareal</dt>
                        <dd className="font-medium text-blue-900">
                            {data.beregning?.tagareal !== undefined
                                ? `${data.beregning.tagareal.toFixed(2)} m²`
                                : "-"}
                        </dd>
                    </div>

                    <div className="flex justify-between text-sm">
                        <dt className="text-blue-800/80">Nyt tag</dt>
                        <dd className="font-medium text-blue-900">
                            {data.beregning?.valgtTagtype
                                ? TAGTYPE_LABELS[data.beregning.valgtTagtype]
                                : "-"}
                        </dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-blue-100 pt-3">
                        <dt className="text-sm font-medium text-blue-900">Estimeret pris</dt>
                        <dd className="text-2xl font-bold tracking-tight text-blue-700">
                            {data.beregning?.prisMin !== undefined
                                ? `${data.beregning.prisMin.toLocaleString("da-DK", {
                                    maximumFractionDigits: 0,
                                })} – ${data.beregning.prisMax?.toLocaleString("da-DK", {
                                    maximumFractionDigits: 0,
                                })} kr.`
                                : "-"}
                        </dd>
                    </div>

                </dl>

            </div>

        </section>

    );

}
