/**
 * ============================================================================
 * BBR - Bygning
 * ============================================================================
 */

export interface DarBygningNode {

    id_lokalId: string;

    husnummer: string | null;

    kommunekode: string | null;

    grund: string | null;

    byg007Bygningsnummer: number | null;

    byg021BygningensAnvendelse: string | null;

    byg026Opfoerelsesaar: number | null;

    byg033Tagdaekningsmateriale: string | null;

    byg038SamletBygningsareal: number | null;

    byg041BebyggetAreal: number | null;

    byg054AntalEtager: number | null;

}

export interface GetBygningResponse {

    BBR_Bygning: {

        nodes: DarBygningNode[];

    };

}

/**
 * ============================================================================
 * BBR - Grund
 * ============================================================================
 */

export interface DarGrundNode {

    id_lokalId: string;

    husnummer: string | null;

    kommunekode: string | null;

    status: string | null;

    bestemtFastEjendom: string | null;

}

export interface GetGrundResponse {

    BBR_Grund: {

        nodes: DarGrundNode[];

    };

}

/**
 * ============================================================================
 * BBR - Ejendomsrelation
 * ============================================================================
 */

/**
 * ============================================================================
 * BBR - Ejendomsrelation
 * ============================================================================
 */

export interface DarEjendomsrelationNode {

    id_lokalId: string;

    bfeNummer: number | null;

    ejendomsnummer: number | null;

    ejendomstype: string | null;

    samletFastEjendom: string | null;

    kommunekode: string | null;

    status: string | null;

}

export interface GetEjendomsrelationResponse {

    BBR_Ejendomsrelation: {

        nodes: DarEjendomsrelationNode[];

    };

}