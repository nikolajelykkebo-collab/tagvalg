"use client";

import { useState } from "react";

import { Home } from "lucide-react";

import ProgressBar from "./Progressbar";
import StepRenderer from "./StepRenderer";
import WizardFooter from "./WizardFooter";

import { trin } from "../constants/step";
import { useWizard } from "../hooks/useWizard";
import { Trin } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Wizard() {
    const {
        aktivtTrin,
        data,
        næsteTrin,
        forrigeTrin,
    } = useWizard();

    const [senderLead, sætSenderLead] =
        useState(false);

    const [leadErSendt, sætLeadErSendt] =
        useState(false);

    const [sendFejl, sætSendFejl] =
        useState<string | null>(null);

    async function sendLead() {

        sætSenderLead(
            true,
        );

        sætSendFejl(
            null,
        );

        try {

            const svar =
                await fetch(
                    "/api/lead",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    },
                );

            if (!svar.ok) {

                throw new Error(
                    `Webhook svarede med status ${svar.status}.`,
                );

            }

            sætLeadErSendt(
                true,
            );

        } catch (error) {

            console.error(
                "Fejl ved afsendelse af lead:",
                error,
            );

            sætSendFejl(
                "Der opstod en fejl — prøv igen.",
            );

        } finally {

            sætSenderLead(
                false,
            );

        }

    }

    function håndterNæste() {

        if (
            aktivtTrin === Trin.Resultat
        ) {

            sendLead();

            return;

        }

        næsteTrin();

    }

    const kanGåVidere =
        aktivtTrin === Trin.Resultat
            ? !senderLead && !leadErSendt
            : aktivtTrin === Trin.Kontakt
                ? EMAIL_REGEX.test(data.kontakt.email.trim())
                    && (
                        !data.kontakt.ønskerOpkald
                            || data.kontakt.telefon.trim() !== ""
                    )
                : Boolean(data.adresse?.id);

    const næsteKnapTekst =
        aktivtTrin === Trin.Resultat
            ? senderLead
                ? "Sender..."
                : leadErSendt
                    ? "Tak! Vi har modtaget dine oplysninger."
                    : "Send"
            : aktivtTrin === Trin.Kontakt
                ? "Se mit prisestimat"
                : "Næste";

    return (
        <main className="calculator-shell mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">

            <div className="mb-8 flex items-center gap-3">

                <div className="calculator-brand-mark flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Home className="size-6" />
                </div>

                <div>

                    <h1 className="calculator-title text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Tagberegner
                    </h1>

                    <p className="calculator-subtitle text-sm text-slate-500">
                        Få et hurtigt estimat på dit nye tag
                    </p>

                </div>

            </div>

            <ProgressBar
                aktivtTrin={aktivtTrin}
                antalTrin={trin.length}
            />

            <div className="calculator-panel flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                <StepRenderer aktivtTrin={aktivtTrin} />

            </div>

            {aktivtTrin === Trin.Resultat && sendFejl && (

                <p className="mt-4 text-center text-sm text-red-600">
                    {sendFejl}
                </p>

            )}

            <WizardFooter
                kanGåTilbage={aktivtTrin > 0}
                kanGåVidere={kanGåVidere}
                næsteKnapTekst={næsteKnapTekst}
                erSidsteTrin={
                    aktivtTrin ===
                    trin.length - 1
                }
                vedTilbage={forrigeTrin}
                vedNæste={håndterNæste}
            />
        </main>
    );
}
