"use client";

import { useState } from "react";

import Image from "next/image";

import { ImageOff, Loader2 } from "lucide-react";

interface Props {
    x: number;
    y: number;
    bredde?: number;
}

// Visningsstørrelsen billedet vises i (CSS-pixels), og hvor
// mange faktiske pixels der bedes om fra WMS-tjenesten. Lidt
// højere end visningsstørrelsen (~1,5x), så det stadig ser
// skarpt ud på skærme med højere pixel-tæthed, uden at hente
// et unødigt stort billede til en lille thumbnail.
const VISNINGSSTØRRELSE_PX = 320;
const PIXELSTØRRELSE = 480;

export default function Ortofoto({
    x,
    y,
    bredde = 50,
}: Props) {

    const [status, sætStatus] =
        useState<"indlæser" | "klar" | "fejl">(
            "indlæser",
        );

    const src =
        `/api/ortofoto?x=${x}&y=${y}&bredde=${bredde}&pixels=${PIXELSTØRRELSE}`;

    return (

        <div
            className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
            style={{ maxWidth: VISNINGSSTØRRELSE_PX }}
        >

            {status !== "fejl" && (

                <Image
                    src={src}
                    alt="Luftfoto af ejendommen"
                    fill
                    sizes={`${VISNINGSSTØRRELSE_PX}px`}
                    unoptimized
                    className={`object-cover transition-opacity duration-300 ${
                        status === "klar"
                            ? "opacity-100"
                            : "opacity-0"
                    }`}
                    onLoad={() =>
                        sætStatus(
                            "klar",
                        )
                    }
                    onError={() =>
                        sætStatus(
                            "fejl",
                        )
                    }
                />

            )}

            {status === "indlæser" && (

                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-slate-400" />
                </div>

            )}

            {status === "fejl" && (

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageOff className="size-6" />
                    <p className="text-xs">
                        Luftfoto kunne ikke hentes
                    </p>
                </div>

            )}

        </div>

    );

}
