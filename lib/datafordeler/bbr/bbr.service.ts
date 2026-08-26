// import { datafordelerGraphQL } from "../clients";
// import { datafordelerConfig } from "../config";

// import { GET_BYGNING } from "./queries/GetBygning";

// import { mapBygninger } from "./bbr.mapper";

// import type {
//     Bygning,
//     GetBygningResponse,
// } from "./bbr.types";

// export async function hentBygninger(
//     husnummerId: string,
// ): Promise<Bygning[]> {
//     const data =
//         await datafordelerGraphQL<GetBygningResponse>(
//             datafordelerConfig.bbrUrl,
//             GET_BYGNING,
//             {
//                 husnummer: husnummerId,
//                 registreringstid: new Date().toISOString(),
//                 virkningstid: new Date().toISOString(),
//             },
//         );

//     return mapBygninger(
//         data.BBR_Bygning.nodes,
//     );
// }

// export async function hentFoersteBygning(
//     husnummerId: string,
// ): Promise<Bygning | null> {
//     const bygninger =
//         await hentBygninger(husnummerId);

//     if (bygninger.length === 0) {
//         return null;
//     }

//     return bygninger[0];
// }