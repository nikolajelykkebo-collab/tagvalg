import {
    Adresse,
    AdresseForslag,
    DarAdresseForslagNode,
    DarAdresseNode,
    DarHusnummerNode,
} from "../dar.types";

/**
 * ============================================================================
 * Adresseforslag
 * ============================================================================
 */

/**
 * Mapper et adresseforslag fra DAR til projektets model.
 */
export function mapAdresseForslag(
    node: DarAdresseForslagNode
): AdresseForslag {

    return {

        id: node.id_lokalId,

        tekst: node.adgangsadressebetegnelse,

    };

}

/**
 * ============================================================================
 * Adresse
 * ============================================================================
 */

const POSTNUMMER_OG_POSTDISTRIKT_REGEX =
    /(\d{4})\s+(.+)$/;

/**
 * Udtrækker postnummer og postdistrikt fra en adressebetegnelse,
 * fx "Bovænget 15, Smidstrup, 7000 Fredericia" -> "7000" / "Fredericia".
 * Bruges som fallback, når DAR ikke leverer dem som separate felter.
 */
function udtrækPostnummerOgPostdistrikt(
    adressebetegnelse: string
): {
    postnummer: string | null;
    postdistrikt: string | null;
} {

    const match =
        adressebetegnelse.match(
            POSTNUMMER_OG_POSTDISTRIKT_REGEX
        );

    if (!match) {

        return {
            postnummer: null,
            postdistrikt: null,
        };

    }

    return {

        postnummer:
            match[1],

        postdistrikt:
            match[2].trim(),

    };

}

/**
 * Samler de nødvendige adresseoplysninger fra:
 *
 * DAR_Adresse
 * DAR_Husnummer
 */
export function mapAdresse(
    adresse: DarAdresseNode,
    husnummer: DarHusnummerNode
): Adresse {

    const udtrukket =
        udtrækPostnummerOgPostdistrikt(
            adresse.adressebetegnelse
        );

    // DAR leverer postnummeret som en separat kode på husnummeret.
    // Brug den, hvis den ser gyldig ud (fire cifre), ellers falder
    // vi tilbage til at udtrække det af adressebetegnelsen.
    const postnummer =
        /^\d{4}$/.test(
            husnummer.postnummer
        )
            ? husnummer.postnummer
            : udtrukket.postnummer;

    return {

        id:
            adresse.id_lokalId,

        adressebetegnelse:
            adresse.adressebetegnelse,

        husnummer:
            husnummer.husnummertekst ?? "",

        etage:
            adresse.etagebetegnelse,

        dør:
            adresse.doerbetegnelse,

        bygningId:
            adresse.bygning,

        postnummer,

        // DAR leverer ikke postdistriktets navn som et
        // separat felt i denne API-flade, så det udtrækkes
        // af adressebetegnelsen.
        postdistrikt:
            udtrukket.postdistrikt,

    };

}