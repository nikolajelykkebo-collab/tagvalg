/**
 * ============================================================================
 * GraphQL - Generiske typer
 * ============================================================================
 */

export interface GraphQLError {
    message: string;
}

export interface GraphQLConnection<TNode> {
    nodes: TNode[];
}

export interface GraphQLResponse<TData> {
    data?: TData;
    errors?: GraphQLError[];
}

/**
 * ============================================================================
 * DAR - Adresseforslag
 * ============================================================================
 */

export interface DarAdresseForslagNode {
    id_lokalId: string;

    adgangsadressebetegnelse: string;

    status: string;
}

export interface AddressSuggestionResponse {
    DAR_Husnummer: GraphQLConnection<DarAdresseForslagNode>;
}

export interface AdresseForslag {
    id: string;

    tekst: string;
}

/**
 * ============================================================================
 * DAR - Adresse
 * ============================================================================
 */

export interface DarAdresseNode {
    id_lokalId: string;

    adressebetegnelse: string;

    husnummer: string | null;

    bygning: string | null;

    etagebetegnelse: string | null;

    doerbetegnelse: string | null;

    status: string;

    registreringFra: string;

    virkningFra: string;
}

export interface GetAdresseResponse {
    DAR_Adresse: GraphQLConnection<DarAdresseNode>;
}

/**
 * ============================================================================
 * DAR - Husnummer
 * ============================================================================
 */

export interface DarHusnummerNode {

    id_lokalId: string;

    adgangsadressebetegnelse: string;

    adgangTilBygning: string | null;

    geoDanmarkBygning: string | null;

    husnummertekst: string | null;

    navngivenVej: string;

    postnummer: string;

    kommuneinddeling: string;

    status: string;

    registreringFra: string;

    virkningFra: string;

    adgangspunkt: string | null;

    vejpunkt: string | null;
}

export interface GetHusnummerResponse {
    DAR_Husnummer: GraphQLConnection<DarHusnummerNode>;
}

/**
 * ============================================================================
 * DAR - Adressepunkt
 * ============================================================================
 */

export interface DarAdressepunktNode {
    id_lokalId: string;

    position: {
        type: string;

        crs: number;

        dimension: string;

        wkt: string;
    } | null;
}

export interface GetAdressepunktResponse {
    DAR_Adressepunkt: GraphQLConnection<DarAdressepunktNode>;
}

/**
 * ============================================================================
 * Domænemodeller
 * ============================================================================
 */

export interface Koordinater {
    breddegrad: number;

    længdegrad: number;
}

export interface Adresse {

    id: string;

    adressebetegnelse: string;

    husnummer: string;

    etage: string | null;

    dør: string | null;

    bygningId: string | null;

}