import Link from "next/link";

import { ArrowLeft, Handshake } from "lucide-react";

const eksempelPartnere = [
    "Partner A",
    "Partner B",
];

export default function SamarbejdspartnerePage() {

    return (
        <main className="calculator-shell mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">

            <div className="mb-8 flex items-center gap-3">

                <div className="calculator-brand-mark flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Handshake className="size-6" />
                </div>

                <div>

                    <h1 className="calculator-title text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Vores samarbejdspartnere
                    </h1>

                    <p className="calculator-subtitle text-sm text-slate-500">
                        Håndværkere og leverandører, der kan kontakte dig
                    </p>

                </div>

            </div>

            <div className="calculator-panel flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                <section className="space-y-6">

                    <p className="text-slate-700">
                        Vi samarbejder med flere håndværkere og
                        leverandører, som kan hjælpe dig videre med
                        dit tagprojekt. Har du sagt ja tak til at
                        blive ringet op, er det en af disse
                        samarbejdspartnere, der kontakter dig
                        telefonisk.
                    </p>

                    <div className="rounded-xl border border-slate-200 p-4">

                        <h2 className="font-semibold text-slate-900">
                            Nuværende samarbejdspartnere
                        </h2>

                        <ul className="mt-3 space-y-2">

                            {eksempelPartnere.map((navn) => (

                                <li
                                    key={navn}
                                    className="flex items-center gap-2 text-slate-700"
                                >
                                    <span className="size-1.5 rounded-full bg-blue-500" />
                                    {navn}
                                </li>

                            ))}

                        </ul>

                        <p className="mt-3 text-sm text-slate-500">
                            Listen er et eksempel og opdateres løbende,
                            efterhånden som vi udvider vores netværk
                            af samarbejdspartnere.
                        </p>

                    </div>

                </section>

            </div>

            <div className="mt-8">

                <Link
                    href="/beregner"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="size-4" />
                    Tilbage til beregneren
                </Link>

            </div>

        </main>
    );

}
