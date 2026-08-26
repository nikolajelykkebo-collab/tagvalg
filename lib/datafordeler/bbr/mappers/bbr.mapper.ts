import {
    DarBygningNode,
} from "../bbr.types";

import type {
    BygningData,
} from "../../../../features/wizard/types";

/**
 * Mapper en bygning fra BBR
 * til projektets BygningData-model.
 */
export function mapBygning(
    bygning: DarBygningNode
): BygningData {

    return {

        id:
            bygning.id_lokalId,

        bygningsnummer:
            bygning.byg007Bygningsnummer
                ?? undefined,

        anvendelse:
            bygning.byg021BygningensAnvendelse
                ?? undefined,

        opførelsesår:
            bygning.byg026Opfoerelsesaar
                ?? undefined,

        tagdækningsmateriale:
            bygning.byg033Tagdaekningsmateriale
                ?? undefined,

        samletBygningsareal:
            bygning.byg038SamletBygningsareal
                ?? undefined,

        bebyggetAreal:
            bygning.byg041BebyggetAreal
                ?? undefined,

        etageantal:
            bygning.byg054AntalEtager
                ?? undefined,

    };

}

/**
 * Mapper BBR's kode for
 * tagdækningsmateriale til UI-værdi.
 */
export function mapTagtype(
    tagdækningsmateriale?: string,
): string {

    switch (tagdækningsmateriale) {

        case "1":
            return "tagpap";

        case "2":
            return "tagpap";

        case "3":
            return "eternit";

        case "4":
            return "betontegl";

        case "5":
            return "tegltag";

        case "6":
            return "ståltag";

        case "7":
            return "stråtag";

        case "10":
            return "eternit";

        case "11":
            return "andet";

        case "12":
            return "andet";

        case "90":
            return "andet";

        default:
            return "";

    }

}

/**
 * Typiske tag-hældninger (grader) pr. tagtype,
 * da BBR ikke registrerer tagets hældning.
 */
const STANDARD_TAGHÆLDNING: Record<string, number> = {

    tagpap: 5,
    eternit: 25,
    betontegl: 30,
    tegltag: 30,
    ståltag: 20,
    stråtag: 45,

};

export function mapStandardHældning(
    tagtype?: string,
): number | undefined {

    if (!tagtype) {
        return undefined;
    }

    return STANDARD_TAGHÆLDNING[tagtype];

}