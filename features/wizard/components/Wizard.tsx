"use client";

import { useState } from "react";

import ProgressBar from "./Progressbar";
import StepRenderer from "./StepRenderer";
import WizardFooter from "./WizardFooter";

import { trin } from "../constants/step";
import { useWizard } from "../hooks/useWizard";
import { Trin } from "../types";

import { useAddress } from "../../address/hooks/useAddress";

import { sporLeadIndsendt } from "../lib/analytics";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Wizard() {
    const {
        aktivtTrin,
        data,
        næsteTrin,
        forrigeTrin,
        opdaterAdresse,
        opdaterBygning,
        opdaterEjendom,
        gåTilTrin,
    } = useWizard();

    // Adressesøgningen deles mellem AddressStep (Enter i feltet)
    // og "Næste"-knappen herunder, så begge fører til samme
    // resultat, når brugeren ikke har valgt et forslag fra
    // dropdown-listen.
    const adresseSøgning =
        useAddress();

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

            sporLeadIndsendt();

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

    async function håndterAdresseOpslag() {

        if (!adresseSøgning.adresse.trim()) {
            return;
        }

        try {

            // Brugeren har ikke valgt et forslag fra
            // dropdown-listen, så vi slår den indtastede
            // tekst op direkte mod DAR, ligesom hvis de
            // havde trykket Enter i selve feltet.
            const resultat =
                await adresseSøgning.søgOgVælgAdresse();

            opdaterAdresse(
                resultat.adresse,
            );

            if (resultat.bygning) {

                opdaterBygning(
                    resultat.bygning,
                );

            }

            if (resultat.ejendom) {

                opdaterEjendom(
                    resultat.ejendom,
                );

            }

            gåTilTrin(
                Trin.Ejendom,
            );

        } catch (error) {

            // Fejlen er allerede gemt i adresseSøgning.fejl
            // og vises i AddressStep.
            console.error(
                error,
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

        if (
            aktivtTrin === Trin.Adresse
                && !data.adresse?.id
        ) {

            håndterAdresseOpslag();

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
                : aktivtTrin === Trin.Adresse
                    ? !adresseSøgning.indlæser
                        && (
                            Boolean(data.adresse?.id)
                                || adresseSøgning.adresse.trim().length > 0
                        )
                    : Boolean(data.adresse?.id);

    const næsteKnapTekst =
        aktivtTrin === Trin.Resultat
            ? senderLead
                ? "Sender..."
                : leadErSendt
                    ? "Tak! Vi har modtaget dine oplysninger."
                    : "Send"
            : aktivtTrin === Trin.Adresse && adresseSøgning.indlæser
                ? "Søger..."
                : aktivtTrin === Trin.Kontakt
                    ? "Se mit prisestimat"
                    : "Næste";

    return (
        <main className="calculator-shell mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">

            <ProgressBar
                aktivtTrin={aktivtTrin}
                antalTrin={trin.length}
            />

            <div className="calculator-panel flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                <StepRenderer
                    aktivtTrin={aktivtTrin}
                    adresseSøgning={adresseSøgning}
                />

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
