"use client";

import { MapPin } from "lucide-react";

import type { AdresseForslag } from "../types";

interface Props {
    forslag: AdresseForslag[];
    vedValg: (adresse: AdresseForslag) => void;
}

export default function AddressSuggestions({
    forslag,
    vedValg,
}: Props) {
    if (forslag.length === 0) {
        return null;
    }

    return (
        <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {forslag.map((forslag) => (
                <li
                    key={forslag.id}
                    onClick={() => {
                        vedValg(forslag);
                    }}
                    className="flex cursor-pointer items-center gap-3 border-b border-slate-100 p-3.5 transition-colors last:border-b-0 hover:bg-blue-50"
                >
                    <MapPin className="size-4 shrink-0 text-slate-400" />

                    <span className="text-sm text-slate-700">
                        {forslag.tekst}
                    </span>
                </li>
            ))}
        </ul>
    );
}
