"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    AdresseData,
    BeregningData,
    BeregnerData,
    BygningData,
    EjendomData,
    KontaktData,
    KortData,
    MatrikelData,
    TagData,
    TilvalgData,
    Trin,
} from "../types";

import {
    sporFeltUdfyldt,
    sporTrinSkift,
} from "../lib/analytics";

interface BeregnerContextType {

    aktivtTrin: Trin;

    data: BeregnerData;

    næsteTrin: () => void;

    forrigeTrin: () => void;

    gåTilTrin: (
        trin: Trin,
    ) => void;

    opdaterAdresse: (
        adresse: AdresseData,
    ) => void;

    opdaterEjendom: (
        ejendom: EjendomData,
    ) => void;

    opdaterBygning: (
        bygning: BygningData | null,
    ) => void;

    opdaterMatrikel: (
        matrikel: MatrikelData,
    ) => void;

    opdaterKort: (
        kort: KortData,
    ) => void;

    opdaterTag: (
        tag: TagData,
    ) => void;

    opdaterBeregning: (
        beregning: BeregningData,
    ) => void;

    opdaterTilvalg: (
        tilvalg: TilvalgData,
    ) => void;

    opdaterKontakt: (
        kontakt: KontaktData,
    ) => void;
}

const startData: BeregnerData = {

    adresse: null,

    ejendom: null,

    bygning: null,

    matrikel: null,

    kort: null,

    tag: null,

    beregning: null,

    tilvalg: {
        solceller: false,
        efterisolering: false,
        tagrender: false,
    },

    kontakt: {
        navn: "",
        email: "",
        telefon: "",
        ønskerOpkald: false,
    },

};

const BeregnerContext =
    createContext<BeregnerContextType | null>(
        null,
    );

interface Props {
    children: ReactNode;
}

export function BeregnerProvider({
    children,
}: Props) {

    const [
        aktivtTrin,
        sætAktivtTrin,
    ] = useState(
        Trin.Adresse,
    );

    const [
        data,
        sætData,
    ] = useState<BeregnerData>(
        startData,
    );

    function næsteTrin() {

        const nytTrin =
            Math.min(
                aktivtTrin + 1,
                Trin.Resultat,
            ) as Trin;

        sporTrinSkift(
            nytTrin,
        );

        sætAktivtTrin(
            (forrige) =>
                Math.min(
                    forrige + 1,
                    Trin.Resultat,
                ),
        );

    }

    function forrigeTrin() {

        const nytTrin =
            Math.max(
                aktivtTrin - 1,
                Trin.Adresse,
            ) as Trin;

        sporTrinSkift(
            nytTrin,
        );

        sætAktivtTrin(
            (forrige) =>
                Math.max(
                    forrige - 1,
                    Trin.Adresse,
                ),
        );

    }

    function gåTilTrin(
        trin: Trin,
    ) {

        sporTrinSkift(
            trin,
        );

        sætAktivtTrin(
            trin,
        );

    }

    function opdaterAdresse(
        adresse: AdresseData,
    ) {

        // opdaterAdresse kaldes altid diskret, når en adresse
        // er fundet (dropdown-valg eller direkte opslag) —
        // aldrig løbende pr. tastetryk — så det er trygt at
        // spore feltet her.
        sporFeltUdfyldt(
            "adresse",
            aktivtTrin,
        );

        sætData(
            (forrige) => ({
                ...forrige,
                adresse,
            }),
        );

    }

    function opdaterEjendom(
        ejendom: EjendomData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                ejendom,
            }),
        );

    }

    function opdaterBygning(
        bygning: BygningData | null,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                bygning,
            }),
        );

    }

    function opdaterMatrikel(
        matrikel: MatrikelData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                matrikel,
            }),
        );

    }

    function opdaterKort(
        kort: KortData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                kort,
            }),
        );

    }

    function opdaterTag(
        tag: TagData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                tag,
            }),
        );

    }

    function opdaterBeregning(
        beregning: BeregningData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                beregning,
            }),
        );

    }

    function opdaterTilvalg(
        tilvalg: TilvalgData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                tilvalg,
            }),
        );

    }

    function opdaterKontakt(
        kontakt: KontaktData,
    ) {

        sætData(
            (forrige) => ({
                ...forrige,
                kontakt,
            }),
        );

    }

    const værdi =
        useMemo(
            () => ({
                aktivtTrin,

                data,

                næsteTrin,

                forrigeTrin,

                gåTilTrin,

                opdaterAdresse,

                opdaterEjendom,

                opdaterBygning,

                opdaterMatrikel,

                opdaterKort,

                opdaterTag,

                opdaterBeregning,

                opdaterTilvalg,

                opdaterKontakt,
            }),
            [
                aktivtTrin,
                data,
            ],
        );

    return (
        <BeregnerContext.Provider
            value={værdi}
        >
            {children}
        </BeregnerContext.Provider>
    );

}

export function brugBeregner() {

    const context =
        useContext(
            BeregnerContext,
        );

    if (!context) {

        throw new Error(
            "brugBeregner skal bruges inde i BeregnerProvider.",
        );

    }

    return context;

}