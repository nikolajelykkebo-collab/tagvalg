import { Trin } from "../types";
import { trinInfo } from "../constants/step";

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

/**
 * Sender et event til Google Tag Managers dataLayer.
 *
 * Wizarden skifter trin og opdaterer data uden en rigtig
 * side-indlæsning/URL-ændring, så GTM opdager det ikke
 * automatisk — det skal sendes eksplicit herfra.
 */
function skubDataLayerEvent(
    event: Record<string, unknown>,
): void {

    if (typeof window === "undefined") {

        return;

    }

    window.dataLayer =
        window.dataLayer || [];

    window.dataLayer.push(
        event,
    );

}

/**
 * Spor at brugeren er skiftet til et nyt trin i wizarden.
 */
export function sporTrinSkift(
    trin: Trin,
): void {

    skubDataLayerEvent({
        event: "wizard_trin_skift",
        trin: trinInfo[trin].label,
    });

}

/**
 * Spor at brugeren har udfyldt/ændret et felt i wizarden.
 * Kaldes ved en afgrænset handling (fx et valg i en dropdown,
 * et flueben, eller når et tekstfelt mister fokus) — aldrig
 * for hvert tastetryk.
 */
export function sporFeltUdfyldt(
    felt: string,
    trin: Trin,
): void {

    skubDataLayerEvent({
        event: "wizard_felt_udfyldt",
        felt,
        trin: trinInfo[trin].label,
    });

}

/**
 * Spor at brugeren har fuldført og indsendt leadet.
 */
export function sporLeadIndsendt(): void {

    skubDataLayerEvent({
        event: "lead_indsendt",
    });

}
