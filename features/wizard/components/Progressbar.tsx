"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/datafordeler/utils";

import { trin, trinInfo } from "../constants/step";
import { Trin } from "../types";

interface ProgressBarProps {
    aktivtTrin: Trin;
    antalTrin: number;
}

export default function ProgressBar({
    aktivtTrin,
}: ProgressBarProps) {

    return (
        <div className="mb-8">

            <ol className="flex items-center">

                {trin.map((trinNummer, index) => {

                    const { label, ikon: Ikon } =
                        trinInfo[trinNummer];

                    const erFærdig =
                        trinNummer < aktivtTrin;

                    const erAktiv =
                        trinNummer === aktivtTrin;

                    const erSidste =
                        index === trin.length - 1;

                    return (

                        <li
                            key={trinNummer}
                            className={cn(
                                "flex items-center",
                                !erSidste && "flex-1",
                            )}
                        >

                            <div className="flex flex-col items-center gap-1.5">

                                <div
                                    className={cn(
                                        "flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:size-10",
                                        erFærdig &&
                                            "border-blue-600 bg-blue-600 text-white",
                                        erAktiv &&
                                            "border-blue-600 bg-white text-blue-600 ring-4 ring-blue-100",
                                        !erFærdig &&
                                            !erAktiv &&
                                            "border-slate-200 bg-white text-slate-400",
                                    )}
                                >

                                    {erFærdig ? (
                                        <Check className="size-4 sm:size-5" />
                                    ) : (
                                        <Ikon className="size-4 sm:size-5" />
                                    )}

                                </div>

                                <span
                                    className={cn(
                                        "hidden text-xs font-medium sm:block",
                                        erAktiv
                                            ? "text-blue-600"
                                            : "text-slate-500",
                                    )}
                                >
                                    {label}
                                </span>

                            </div>

                            {!erSidste && (

                                <div
                                    className={cn(
                                        "mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mx-3",
                                        erFærdig
                                            ? "bg-blue-600"
                                            : "bg-slate-200",
                                    )}
                                />

                            )}

                        </li>

                    );

                })}

            </ol>

            <p className="mt-3 text-center text-xs font-medium text-slate-500 sm:hidden">
                {trinInfo[aktivtTrin].label}
            </p>

        </div>
    );
}
