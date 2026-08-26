import type {
    DarEjendomsrelationNode,
} from "../bbr.types";

import type {
    EjendomData,
} from "../../../../features/wizard/types";

/**
 * Mapper en ejendomsrelation fra BBR
 * til projektets EjendomData-model.
 *
 * Vi mapper kun felter, som vi med sikkerhed
 * kan udlede direkte fra BBR_Ejendomsrelation.
 */
export function mapEjendomsrelation(
    ejendomsrelation: DarEjendomsrelationNode
): EjendomData {

    return {

        bfeNummer:
            ejendomsrelation.bfeNummer
                !== null
                ? String(
                    ejendomsrelation.bfeNummer
                )
                : undefined,

    };

}