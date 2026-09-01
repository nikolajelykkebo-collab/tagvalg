"use client";

import {
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import { Lock, Mail } from "lucide-react";

import { useWizard } from "../hooks/useWizard";

import { sporFeltUdfyldt } from "../lib/analytics";
import { Trin } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KontaktStep() {

    const {
        data,
        opdaterKontakt,
    } = useWizard();

    const [navn, sætNavn] =
        useState(
            data.kontakt.navn,
        );

    const [email, sætEmail] =
        useState(
            data.kontakt.email,
        );

    const [emailErRørt, sætEmailErRørt] =
        useState(false);

    const [telefon, sætTelefon] =
        useState(
            data.kontakt.telefon,
        );

    const [ønskerOpkald, sætØnskerOpkald] =
        useState(
            data.kontakt.ønskerOpkald,
        );

    const emailErGyldig =
        EMAIL_REGEX.test(
            email.trim(),
        );

    const telefonManglerOgErPåkrævet =
        ønskerOpkald && telefon.trim() === "";

    useEffect(() => {

        opdaterKontakt({
            ...data.kontakt,
            navn,
            email,
            telefon,
            ønskerOpkald,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navn, email, telefon, ønskerOpkald]);

    function opdaterNavn(
        værdi: string,
    ) {

        sætNavn(
            værdi,
        );

    }

    function opdaterEmail(
        værdi: string,
    ) {

        sætEmail(
            værdi,
        );

    }

    function opdaterTelefon(
        værdi: string,
    ) {

        sætTelefon(
            værdi,
        );

    }

    return (

        <section className="space-y-6">

            <div className="flex items-start gap-4">

                <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                    <Mail className="size-7" />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Kontakt
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Indtast din e-mail for at se resultatet.
                        Navn og telefon er valgfrit.
                    </p>

                </div>

            </div>

            {data.beregning?.pris !== undefined && (

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">

                    <p className="flex items-center gap-1.5 text-sm font-medium text-blue-900">
                        <Lock className="size-4" />
                        Dit estimat er klar
                    </p>

                    <p
                        aria-hidden="true"
                        className="mt-1 select-none text-3xl font-bold tracking-tight text-blue-700 blur-sm"
                    >
                        {data.beregning.pris.toLocaleString("da-DK", {
                            maximumFractionDigits: 0,
                        })}{" "}
                        kr.
                    </p>

                    <p className="mt-2 text-sm text-blue-800/80">
                        Udfyld dine oplysninger herunder for at
                        se dit fulde prisestimat.
                    </p>

                </div>

            )}

            <div>

                <label
                    htmlFor="kontakt-navn"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                >
                    Navn
                </label>

                <input
                    id="kontakt-navn"
                    type="text"
                    value={navn}
                    onChange={(event) =>
                        opdaterNavn(
                            event.target.value,
                        )
                    }
                    onBlur={() =>
                        sporFeltUdfyldt(
                            "navn",
                            Trin.Kontakt,
                        )
                    }
                    placeholder="Dit navn"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

            </div>

            <div>

                <label
                    htmlFor="kontakt-email"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                >
                    E-mail
                </label>

                <input
                    id="kontakt-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        opdaterEmail(
                            event.target.value,
                        )
                    }
                    onBlur={() => {

                        sætEmailErRørt(
                            true,
                        );

                        sporFeltUdfyldt(
                            "email",
                            Trin.Kontakt,
                        );

                    }}
                    placeholder="din@email.dk"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-4 ${
                        emailErRørt && !emailErGyldig
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                />

                {emailErRørt && !emailErGyldig && (

                    <p className="mt-2 text-sm text-red-600">
                        Indtast venligst en gyldig e-mailadresse.
                    </p>

                )}

            </div>

            <div>

                <label
                    htmlFor="kontakt-telefon"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                >
                    Telefonnummer
                </label>

                <input
                    id="kontakt-telefon"
                    type="tel"
                    value={telefon}
                    onChange={(event) =>
                        opdaterTelefon(
                            event.target.value,
                        )
                    }
                    onBlur={() =>
                        sporFeltUdfyldt(
                            "telefon",
                            Trin.Kontakt,
                        )
                    }
                    placeholder="Dit telefonnummer"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:ring-4 ${
                        telefonManglerOgErPåkrævet
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                />

                {telefonManglerOgErPåkrævet && (

                    <p className="mt-2 text-sm text-red-600">
                        Indtast venligst dit telefonnummer, hvis du
                        ønsker at blive ringet op.
                    </p>

                )}

            </div>

            <div>

                <label className="flex items-start gap-2.5 text-sm font-medium text-slate-900">

                    <input
                        type="checkbox"
                        checked={ønskerOpkald}
                        onChange={(event) => {

                            sætØnskerOpkald(
                                event.target.checked,
                            );

                            sporFeltUdfyldt(
                                "oensker_opkald",
                                Trin.Kontakt,
                            );

                        }}
                        className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-blue-600 outline-none focus:ring-4 focus:ring-blue-100"
                    />

                    <span>
                        Ja tak, en af{" "}
                        <Link
                            href="/samarbejdspartnere"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                            className="text-blue-600 underline hover:text-blue-700"
                        >
                            vores samarbejdspartnere
                        </Link>{" "}
                        må gerne ringe til mig om mit tagprojekt.
                    </span>

                </label>

                <p className="mt-2 text-xs text-slate-500">
                    Ved at sætte kryds accepterer du, at dit navn
                    og telefonnummer deles med den samarbejdspartner,
                    der kontakter dig.
                </p>

            </div>

        </section>

    );

}
