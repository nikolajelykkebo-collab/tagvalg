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

    };

}