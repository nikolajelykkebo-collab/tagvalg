import { NextRequest, NextResponse } from "next/server";

import {
    datafordelerService,
} from "@/lib/datafordeler/facade/datafordeler.service";

export async function GET(
    request: NextRequest,
) {

    try {

        const adressebetegnelse =
            request.nextUrl.searchParams.get(
                "adressebetegnelse",
            );

        if (!adressebetegnelse) {

            return NextResponse.json(
                {
                    error: "adressebetegnelse mangler.",
                },
                {
                    status: 400,
                },
            );

        }

        const resultat =
            await datafordelerService.hentAdresseMedBygning(
                adressebetegnelse,
            );

        return NextResponse.json(
            resultat,
            {
                status: 200,
            },
        );

    } catch (error) {

        console.error(
            "Fejl ved hentning af adresse:",
            error,
        );

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Kunne ikke hente adressen.",
            },
            {
                status: 404,
            },
        );

    }

}