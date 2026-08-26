/**
 * ============================================================================
 * GeoDanmark Vektor (GEODKV) - Bygning
 * ============================================================================
 */

export interface GeoDanmarkGeometri {

    wkt: string;

}

export interface GeoDanmarkBygningNode {

    id_lokalId: string;

    BBRUUID: string | null;

    bygningstype: string;

    metode3D: string;

    maalestedBygning: string;

    geometristatus: string;

    vertikalNoejagtighed: string;

    planNoejagtighed: string;

    geometri: GeoDanmarkGeometri;

}

export interface GetGeoDanmarkBygningResponse {

    GEODKV_Bygning: {

        nodes: GeoDanmarkBygningNode[];

    };

}
