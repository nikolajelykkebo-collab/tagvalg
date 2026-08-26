"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "./useDebounce";

import {
    hentAdresse,
    hentAdresseForslag,
    type AdresseResultat,
} from "../services/address.service";

import type {
    AdresseForslag,
} from "../types";

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

    useEffect(() => {

        if (
            debouncedAdresse.trim().length < 3
        ) {

            sætForslag([]);

            return;

        }

        async function hentForslag() {

            try {

                sætFejl(null);

                const resultat =
                    await hentAdresseForslag(
                        debouncedAdresse,
                    );

                sætForslag(
                    resultat,
                );

            } catch (error) {

                console.error(
                    error,
                );

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

        sætAdresse(
            værdi,
        );

        sætFejl(null);

    }

    async function vælgAdresse(
        forslag: AdresseForslag,
    ): Promise<AdresseResultat> {

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

    return {

        adresse,

        forslag,

        indlæser,

        fejl,

        opdaterAdresse,

        vælgAdresse,

        rydForslag,

    };

}