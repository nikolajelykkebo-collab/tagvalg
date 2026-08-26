import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ status: "ok" });
}

// import { hentFoersteBygning } from "@/lib/datafordeler/bbr/bbr.service";

// export async function GET() {
//     try {
//         const husnummerId =
//             "INDSÆT_ET_GYLDIGT_HUSNUMMER_ID";

//         const bygning =
//             await hentFoersteBygning(husnummerId);

//         return NextResponse.json(bygning);
//     } catch (error) {
//         console.error(error);

//         return NextResponse.json(
//             {
//                 error: String(error),
//             },
//             {
//                 status: 500,
//             },
//         );
//     }
// }