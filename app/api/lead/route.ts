import { NextRequest, NextResponse } from "next/server";

import type { BeregnerData } from "../../../features/wizard/types";

import { TAGTYPE_LABELS } from "../../../features/wizard/constants/tagpriser";

interface FladtLead {
    adresse: string;
    postnummer: string;
    postdistrikt: string;
    byggeaar: number | null;
    tagtype: string;
    haeldning: number | null;
    bebygget_areal: number | null;
    tilstand: string;
    tidshorisont: string;
    beregnet_tagareal: number | null;
    valgt_tagtype: string;
    pris_min: number | null;
    pris_max: number | null;
    navn: string;
    email: string;
    telefon: string;
    oensker_opkald: boolean | null;
}

// Bygger et fladt objekt med ASCII-navngivne felter ud fra det
// indlejrede data-objekt, så det matcher direkte op med
// kolonnerne i Airtable. Manglende/null/undefined felter sendes
// som tom streng eller null i stedet for at fejle.
function byggFladtLead(
    data: BeregnerData,
): FladtLead {

    return {

        adresse:
            data.adresse?.tekst
                ?? "",

        postnummer:
            data.adresse?.postnummer
                ?? "",

        postdistrikt:
            data.adresse?.postdistrikt
                ?? "",

        byggeaar:
            data.bygning?.opførelsesår
                ?? null,

        tagtype:
            data.tag?.type
                ?? "",

        haeldning:
            data.tag?.hældning
                ?? null,

        bebygget_areal:
            data.tag?.areal
                ?? null,

        tilstand:
            data.tag?.tilstand
                ?? "",

        tidshorisont:
            data.tag?.tidshorisont
                ?? "",

        beregnet_tagareal:
            data.beregning?.tagareal
                ?? null,

        valgt_tagtype:
            data.beregning?.valgtTagtype
                ? TAGTYPE_LABELS[data.beregning.valgtTagtype]
                    ?? data.beregning.valgtTagtype
                : "",

        pris_min:
            data.beregning?.prisMin
                ?? null,

        pris_max:
            data.beregning?.prisMax
                ?? null,

        navn:
            data.kontakt?.navn
                ?? "",

        email:
            data.kontakt?.email
                ?? "",

        telefon:
            data.kontakt?.telefon
                ?? "",

        oensker_opkald:
            data.kontakt?.ønskerOpkald
                ?? null,

    };

}

export async function POST(
    request: NextRequest,
) {

    try {

        const lead: BeregnerData =
            await request.json();

        const fladtLead =
            byggFladtLead(
                lead,
            );

        const webhookUrl =
            process.env.MAKE_WEBHOOK_URL;

        if (!webhookUrl) {

            console.error(
                "MAKE_WEBHOOK_URL er ikke sat.",
            );

            return NextResponse.json(
                {
                    error: "Webhook-URL er ikke konfigureret.",
                },
                {
                    status: 500,
                },
            );

        }

        const svar =
            await fetch(
                webhookUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(fladtLead),
                },
            );

        if (!svar.ok) {

            throw new Error(
                `Webhook svarede med status ${svar.status}.`,
            );

        }

        return NextResponse.json(
            {
                success: true,
            },
            {
                status: 200,
            },
        );

    } catch (error) {

        console.error(
            "Fejl ved afsendelse af lead til Make-webhook:",
            error,
        );

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Kunne ikke sende lead til webhook.",
            },
            {
                status: 500,
            },
        );

    }

}
