/**
 * Startpriser pr. m² pr. tagtype (kr.), baseret på markedets prisintervaller.
 */
export const TAGPRIS_PR_KVADRATMETER: Record<string, number> = {

    tagpap: 700,
    ståltag: 880,
    eternit: 905,
    betontegl: 1400,
    tegltag: 1600,
    stråtag: 1750,
    naturskifer: 2200,

};

/**
 * Markedets prisinterval pr. m² pr. tagtype (kr.).
 */
export const TAGPRIS_INTERVAL_PR_KVADRATMETER: Record<string, { min: number; max: number }> = {

    tagpap: { min: 400, max: 1000 },
    ståltag: { min: 760, max: 1000 },
    eternit: { min: 830, max: 980 },
    betontegl: { min: 1150, max: 1650 },
    tegltag: { min: 1300, max: 1900 },
    stråtag: { min: 1500, max: 2000 },
    naturskifer: { min: 1900, max: 2500 },

};

export const TAGTYPE_LABELS: Record<string, string> = {

    tagpap: "Tagpap",
    ståltag: "Stål",
    eternit: "Eternit",
    betontegl: "Betontagsten",
    tegltag: "Tegl",
    stråtag: "Stråtag",
    naturskifer: "Naturskifer",

};
