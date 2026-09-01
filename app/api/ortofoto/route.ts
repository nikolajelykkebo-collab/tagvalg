import { NextRequest, NextResponse } from "next/server";

const ORTOFOTO_URL =
    "https://api.dataforsyningen.dk/orto_foraar_DAF";

// Ortofoto-laget hedder "orto_foraar" i Datafordelerens
// WMS-tjeneste (fundet via GetCapabilities) og leveres i
// EPSG:25832 — samme koordinatsystem, som DAR selv leverer
// adressepunkternes koordinater i, så der skal ikke
// transformeres mellem systemer.
const LAG = "orto_foraar";
const CRS = "EPSG:25832";

// Standard-pixelstørrelse, hvis klienten ikke selv beder om en
// bestemt størrelse. Billedet vises kun som en lille thumbnail
// i UI'et, så der er ingen grund til at hente noget stort.
const STANDARD_PIXELSTØRRELSE = 480;
const MIN_PIXELSTØRRELSE = 100;
const MAX_PIXELSTØRRELSE = 800;

export async function GET(
    request: NextRequest,
) {

    try {

        const xParam =
            request.nextUrl.searchParams.get(
                "x",
            );

        const yParam =
            request.nextUrl.searchParams.get(
                "y",
            );

        // Number(null) er 0, så vi tjekker eksplicit for
        // manglende parametre først — ellers ville "ingen
        // koordinater angivet" stille blive til (0, 0).
        if (
            !xParam
                || !yParam
        ) {

            return NextResponse.json(
                {
                    error: "x og y (EPSG:25832-koordinater) er påkrævet.",
                },
                {
                    status: 400,
                },
            );

        }

        const x =
            Number(
                xParam,
            );

        const y =
            Number(
                yParam,
            );

        if (
            !Number.isFinite(x)
                || !Number.isFinite(y)
        ) {

            return NextResponse.json(
                {
                    error: "x og y skal være gyldige tal.",
                },
                {
                    status: 400,
                },
            );

        }

        // Hvor mange meter billedet skal dække i bredden/højden.
        const bredde =
            Number(
                request.nextUrl.searchParams.get(
                    "bredde",
                ),
            ) || 50;

        // Hvor mange pixels billedet skal være (bredde/højde er
        // altid ens, kvadratisk). Klienten sender den faktiske
        // visningsstørrelse med, så vi ikke henter et unødigt
        // stort billede til en lille thumbnail. Begrænses til et
        // fornuftigt interval, uanset hvad der bliver sendt ind.
        const ønsketPixelstørrelse =
            Number(
                request.nextUrl.searchParams.get(
                    "pixels",
                ),
            ) || STANDARD_PIXELSTØRRELSE;

        const pixelstørrelse =
            Math.min(
                MAX_PIXELSTØRRELSE,
                Math.max(
                    MIN_PIXELSTØRRELSE,
                    Math.round(
                        ønsketPixelstørrelse,
                    ),
                ),
            );

        const token =
            process.env.ORTOFOTO_TOKEN;

        if (!token) {

            console.error(
                "ORTOFOTO_TOKEN er ikke sat.",
            );

            return NextResponse.json(
                {
                    error: "Ortofoto-tjenesten er ikke konfigureret.",
                },
                {
                    status: 500,
                },
            );

        }

        const halvBredde =
            bredde / 2;

        const bbox =
            [
                x - halvBredde,
                y - halvBredde,
                x + halvBredde,
                y + halvBredde,
            ].join(",");

        const wmsUrl =
            new URL(
                ORTOFOTO_URL,
            );

        wmsUrl.searchParams.set(
            "service",
            "WMS",
        );

        wmsUrl.searchParams.set(
            "version",
            "1.3.0",
        );

        wmsUrl.searchParams.set(
            "request",
            "GetMap",
        );

        wmsUrl.searchParams.set(
            "layers",
            LAG,
        );

        wmsUrl.searchParams.set(
            "styles",
            "",
        );

        wmsUrl.searchParams.set(
            "crs",
            CRS,
        );

        wmsUrl.searchParams.set(
            "bbox",
            bbox,
        );

        wmsUrl.searchParams.set(
            "width",
            String(pixelstørrelse),
        );

        wmsUrl.searchParams.set(
            "height",
            String(pixelstørrelse),
        );

        wmsUrl.searchParams.set(
            "format",
            "image/jpeg",
        );

        wmsUrl.searchParams.set(
            "token",
            token,
        );

        const svar =
            await fetch(
                wmsUrl,
            );

        const contentType =
            svar.headers.get(
                "content-type",
            );

        if (
            !svar.ok
                || !contentType?.startsWith("image/")
        ) {

            throw new Error(
                `Ortofoto-tjenesten svarede med status ${svar.status} (${contentType ?? "ukendt content-type"}).`,
            );

        }

        const billede =
            await svar.arrayBuffer();

        return new NextResponse(
            billede,
            {
                status: 200,
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "public, max-age=3600",
                },
            },
        );

    } catch (error) {

        console.error(
            "Fejl ved hentning af luftfoto:",
            error,
        );

        return NextResponse.json(
            {
                error: "Kunne ikke hente luftfoto.",
            },
            {
                status: 502,
            },
        );

    }

}
