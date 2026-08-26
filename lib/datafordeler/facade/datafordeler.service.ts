import {
    Adresse,
    AdresseForslag,
} from "../dar/dar.types";

import { mapAdresse } from "../dar/mappers/adresse.mapper";

import { adresseService } from "../dar/services/adresse.service";
import { husnummerService } from "../dar/services/husnummer.service";

import { bygningService } from "../bbr/services/bygning.service";
import { mapBygning } from "../bbr/mappers/bbr.mapper";

import { grundService } from "../bbr/services/grund.service";

import {
    ejendomsrelationService,
} from "../bbr/services/ejendomsrelation.service";

import {
    mapEjendomsrelation,
} from "../bbr/mappers/ejendomsrelation.mapper";

import {
    geodanmarkBygningService,
} from "../geodanmark/services/bygning.service";

export class DatafordelerService {

    /**
     * Henter adresseforslag til autocomplete.
     */
    async hentAdresseForslag(
        search: string
    ): Promise<AdresseForslag[]> {

        return adresseService.hentAdresseForslag(
            search
        );

    }

    /**
     * Henter en komplet adresse fra DAR.
     *
     * Flow:
     *
     * adressebetegnelse
     *      ↓
     * DAR_Adresse
     *      ↓
     * DAR_Husnummer
     *      ↓
     * Adresse
     */
    async hentAdresse(
        adressebetegnelse: string
    ): Promise<Adresse> {

        const adresse =
            await adresseService.hentAdresse(
                adressebetegnelse
            );

        if (!adresse.husnummer) {

            throw new Error(
                `Adresse '${adressebetegnelse}' har ikke et tilknyttet husnummer.`
            );

        }

        const husnummer =
            await husnummerService.hentHusnummer(
                adresse.husnummer
            );

        return mapAdresse(
            adresse,
            husnummer
        );

    }

    /**
     * Henter adresse, BBR-bygning, BBR-grund,
     * ejendomsrelation og projektets EjendomData.
     *
     * Flow:
     *
     * DAR_Adresse
     *      ↓
     * DAR_Husnummer
     *      ↓
     * adgangTilBygning
     *      ↓
     * BBR_Bygning
     *      ↓
     * grund
     *      ↓
     * BBR_Grund
     *      ↓
     * bestemtFastEjendom
     *      ↓
     * BBR_Ejendomsrelation
     *      ↓
     * mapEjendomsrelation()
     *      ↓
     * EjendomData
     */
    async hentAdresseMedBygning(
        adressebetegnelse: string
    ) {

        const adresse =
            await adresseService.hentAdresse(
                adressebetegnelse
            );

        if (!adresse.husnummer) {

            throw new Error(
                `Adresse '${adressebetegnelse}' har ikke et tilknyttet husnummer.`
            );

        }

        const husnummer =
            await husnummerService.hentHusnummer(
                adresse.husnummer
            );

        const mappedAdresse =
            mapAdresse(
                adresse,
                husnummer
            );

        const darBygning =
            husnummer.adgangTilBygning
                ? await bygningService.hentBygning(
                    husnummer.adgangTilBygning
                )
                : null;

        const bygning =
            darBygning
                ? mapBygning(
                    darBygning
                )
                : null;

        const grund =
            darBygning?.grund
                ? await grundService.hentGrund(
                    darBygning.grund
                )
                : null;

        const ejendomsrelation =
            grund?.bestemtFastEjendom
                ? await ejendomsrelationService.hentEjendomsrelation(
                    grund.bestemtFastEjendom
                )
                : null;

        const ejendom =
            ejendomsrelation
                ? mapEjendomsrelation(
                    ejendomsrelation
                )
                : null;

        let geodanmarkBygning = null;

        if (darBygning) {

            try {

                geodanmarkBygning =
                    await geodanmarkBygningService.hentBygningVedBbrUuid(
                        darBygning.id_lokalId
                    );

            } catch (error) {

                console.warn(
                    "GeoDanmark-bygning kunne ikke hentes; fortsætter uden geometri.",
                    error
                );

            }

        }

        console.log(
            "========== DATAFORDELER EJENDOMSRELATION =========="
        );

        console.log(
            JSON.stringify(
                ejendomsrelation,
                null,
                2
            )
        );

        console.log(
            "========== DATAFORDELER EJENDOM =========="
        );

        console.log(
            JSON.stringify(
                ejendom,
                null,
                2
            )
        );

        return {

            adresse:
                mappedAdresse,

            bygning,

            grund,

            ejendomsrelation,

            ejendom,

            geodanmarkBygning,

        };

    }

}

export const datafordelerService =
    new DatafordelerService();