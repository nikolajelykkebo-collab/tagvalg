import type { Adresse } from "@/lib/datafordeler/dar/dar.types";

export async function hentAdresse(
    id: string,
): Promise<Adresse> {

    const response = await fetch(`/api/dar/address/${id}`);

    if (!response.ok) {
        throw new Error("Kunne ikke hente adresse.");
    }

    return response.json();
}