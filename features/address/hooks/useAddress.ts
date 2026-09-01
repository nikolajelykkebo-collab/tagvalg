"use client";

import { useEffect, useRef, useState } from "react";

import { useDebounce } from "./useDebounce";

import {
    hentAdresse,
    hentAdresseForslag,
    type AdresseResultat,
} from "../services/address.service";

import type {
    AdresseForslag,
} from "../types";

const IKKE_FUNDET_FEJL =
    "Vi kunne ikke finde denne adresse — tjek stavningen eller prøv en anden adresse.";

const POSTNUMMER_ALENE_FEJL =
    "Skriv venligst hele adressen, inkl. vejnavn og husnummer, fx Margrethevej 20, 7100 Vejle.";

// True, hvis hele teksten kun er et postnummer (og evt. et
// bynavn), uden vejnavn og husnummer foran.
const KUN_POSTNUMMER_REGEX =
    /^\d{4}(\s+\S.*)?$/;

function erKunPostnummer(
    tekst: string,
): boolean {

    return KUN_POSTNUMMER_REGEX.test(
        tekst.trim(),
    );

}

export function useAddress() {

    const [adresse, sætAdresse] =
        useState("");

    const debouncedAdresse =
        useDebounce(adresse);

    const [forslag, sætForslag] =
        useState<AdresseForslag[]>([]);

    const [indlæser, sætIndlæser] =
        useState(false);

    const [fejl, sætFejl] =
        useState<string | null>(null);

    // Fælles tæller, der bruges til at kassere svar fra en
    // "gammel" søgning, hvis en nyere søgning (enten en ny
    // debounced auto-forslag-søgning eller et eksplicit
    // Enter/knap-opslag via søgOgVælgAdresse) er startet i
    // mellemtiden. Uden dette kan de to samtidige søgninger
    // race og overskrive hinandens resultat/fejlbesked.
    const forespørgselIdRef =
        useRef(0);

    // Sat til true, mens et eksplicit opslag (Enter/knap eller
    // valg fra dropdown-listen) er i gang eller allerede har
    // afgjort sagen for den nuværende tekst. Så længe den er
    // true, må den passive debounce-søgning herunder ikke
    // overskrive resultatet/fejlbeskeden — ellers kan dens
    // forsinkede "0 forslag er stadig et gyldigt (tomt) svar"
    // komme og overskrive en fejlbesked, der allerede er vist.
    // Nulstilles når brugeren skriver videre.
    const eksplicitOpslagRef =
        useRef(false);

    useEffect(() => {

        if (
            debouncedAdresse.trim().length < 3
        ) {

            sætForslag([]);

            return;

        }

        const egetId =
            ++forespørgselIdRef.current;

        async function hentForslag() {

            try {

                const resultat =
                    await hentAdresseForslag(
                        debouncedAdresse,
                    );

                if (
                    forespørgselIdRef.current !== egetId
                        || eksplicitOpslagRef.current
                ) {
                    return;
                }

                sætFejl(null);

                sætForslag(
                    resultat,
                );

            } catch (error) {

                console.error(
                    error,
                );

                if (
                    forespørgselIdRef.current !== egetId
                        || eksplicitOpslagRef.current
                ) {
                    return;
                }

                sætForslag([]);

                sætFejl(
                    "Kunne ikke hente adresser.",
                );

            }

        }

        hentForslag();

    }, [debouncedAdresse]);

    function opdaterAdresse(
        værdi: string,
    ) {

        eksplicitOpslagRef.current = false;

        sætAdresse(
            værdi,
        );

        sætFejl(null);

    }

    async function vælgAdresse(
        forslag: AdresseForslag,
    ): Promise<AdresseResultat> {

        // Kasserer et evt. resultat fra en igangværende
        // baggrunds-søgning, så det ikke overskriver denne
        // eksplicitte, brugerinitierede handling bagefter.
        ++forespørgselIdRef.current;

        eksplicitOpslagRef.current = true;

        try {

            sætIndlæser(true);

            sætFejl(null);

            const resultat =
                await hentAdresse(
                    forslag.tekst,
                );

            sætAdresse(
                resultat.adresse.tekst,
            );

            sætForslag([]);

            return resultat;

        } catch (error) {

            console.error(
                error,
            );

            sætFejl(
                "Kunne ikke hente adresse.",
            );

            throw error;

        } finally {

            sætIndlæser(false);

        }

    }

    function rydForslag() {

        sætForslag([]);

    }

    /**
     * Slår den indtastede tekst op direkte mod DAR (samme
     * søgefunktion som bruges til forslagene), og vælger det
     * bedst matchende resultat automatisk. Bruges når brugeren
     * trykker Enter eller klikker videre uden selv at have
     * valgt et forslag fra dropdown-listen.
     */
    async function søgOgVælgAdresse(): Promise<AdresseResultat> {

        // Kasserer et evt. resultat fra en igangværende
        // baggrunds-søgning, så det ikke overskriver denne
        // eksplicitte, brugerinitierede handling bagefter.
        ++forespørgselIdRef.current;

        eksplicitOpslagRef.current = true;

        try {

            sætIndlæser(true);

            sætFejl(null);

            if (erKunPostnummer(adresse)) {

                throw new Error(
                    POSTNUMMER_ALENE_FEJL,
                );

            }

            // Oprydning og normalisering (mellemrum, komma
            // foran postnummer, bynavn i stedet for postnummer
            // osv.) sker i hentAdresseForslag, som deles med
            // den løbende auto-forslag-søgning herover.
            const resultater =
                await hentAdresseForslag(
                    adresse,
                );

            if (resultater.length === 0) {

                throw new Error(
                    IKKE_FUNDET_FEJL,
                );

            }

            const resultat =
                await hentAdresse(
                    resultater[0].tekst,
                );

            sætAdresse(
                resultat.adresse.tekst,
            );

            sætForslag([]);

            return resultat;

        } catch (error) {

            console.error(
                error,
            );

            sætForslag([]);

            sætFejl(
                error instanceof Error
                    && (
                        error.message === POSTNUMMER_ALENE_FEJL
                            || error.message === IKKE_FUNDET_FEJL
                    )
                    ? error.message
                    : IKKE_FUNDET_FEJL,
            );

            throw error;

        } finally {

            sætIndlæser(false);

        }

    }

    return {

        adresse,

        forslag,

        indlæser,

        fejl,

        opdaterAdresse,

        vælgAdresse,

        søgOgVælgAdresse,

        rydForslag,

    };

}

export type AdresseSøgning = ReturnType<typeof useAddress>;