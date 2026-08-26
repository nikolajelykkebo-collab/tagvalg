"use client";

import { Building2, MapPin } from "lucide-react";

import { useWizard } from "../hooks/useWizard";

export default function EjendomStep() {

    const {
        data,
    } = useWizard();

    const bygningsfelter = data.bygning
        ? [
            { label: "ID", værdi: data.bygning.id },
            { label: "Bygningsnummer", værdi: data.bygning.bygningsnummer },
            { label: "Anvendelse", værdi: data.bygning.anvendelse },
            { label: "Opførelsesår", værdi: data.bygning.opførelsesår },
            { label: "Tagdækningsmateriale", værdi: data.bygning.tagdækningsmateriale },
            {
                label: "Samlet bygningsareal",
                værdi:
                    data.bygning.samletBygningsareal !== undefined
                        ? `${data.bygning.samletBygningsareal} m²`
                        : undefined,
            },
            {
                label: "Bebygget areal",
                værdi:
                    data.bygning.bebyggetAreal !== undefined
                        ? `${data.bygning.bebyggetAreal} m²`
                        : undefined,
            },
            { label: "Antal etager", værdi: data.bygning.etageantal },
        ].filter((felt) => felt.værdi !== undefined && felt.værdi !== null)
        : [];

    return (
        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <Building2 className="size-7" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Ejendom
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Oplysninger om den valgte ejendom.
                    </p>
                </div>

            </div>

            <div className="rounded-xl border border-slate-200 p-4">

                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <MapPin className="size-4 text-slate-400" />
                    Adresse
                </h3>

                {data.adresse ? (

                    <p className="mt-2 text-slate-700">
                        {data.adresse.tekst}
                    </p>

                ) : (

                    <p className="mt-2 text-slate-500">
                        Ingen adresse valgt.
                    </p>

                )}

            </div>

            <div className="rounded-xl border border-slate-200 p-4">

                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <Building2 className="size-4 text-slate-400" />
                    Bygning
                </h3>

                {bygningsfelter.length > 0 ? (

                    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">

                        {bygningsfelter.map((felt) => (

                            <div
                                key={felt.label}
                                className="flex justify-between border-b border-slate-100 py-1.5 text-sm sm:justify-start sm:gap-2"
                            >
                                <dt className="text-slate-500">
                                    {felt.label}
                                </dt>
                                <dd className="font-medium text-slate-900">
                                    {felt.værdi}
                                </dd>
                            </div>

                        ))}

                    </dl>

                ) : (

                    <p className="mt-3 text-slate-500">
                        Der blev ikke fundet en tilknyttet bygning.
                    </p>

                )}

            </div>

        </section>
    );
}
