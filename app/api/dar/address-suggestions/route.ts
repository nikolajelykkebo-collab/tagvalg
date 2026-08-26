import { NextRequest, NextResponse } from "next/server";

import { datafordelerService } from "@/lib/datafordeler";

export async function GET(request: NextRequest) {

    const search =
        request.nextUrl.searchParams.get("search");

    if (!search) {
        return NextResponse.json([]);
    }

    const forslag =
        await datafordelerService.hentAdresseForslag(search);

    return NextResponse.json(forslag);

}