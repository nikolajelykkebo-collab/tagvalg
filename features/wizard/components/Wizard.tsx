"use client";

import { Home } from "lucide-react";

import ProgressBar from "./Progressbar";
import StepRenderer from "./StepRenderer";
import WizardFooter from "./WizardFooter";

import { trin } from "../constants/step";
import { useWizard } from "../hooks/useWizard";

export default function Wizard() {
    const {
        aktivtTrin,
        data,
        næsteTrin,
        forrigeTrin,
    } = useWizard();

    return (
        <main className="calculator-shell mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-12">

            <div className="mb-8 flex items-center gap-3">

                <div className="calculator-brand-mark flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Home className="size-6" />
                </div>

                <div>

                    <h1 className="calculator-title text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Tagberegner
                    </h1>

                    <p className="calculator-subtitle text-sm text-slate-500">
                        Få et hurtigt estimat på dit nye tag
                    </p>

                </div>

            </div>

            <ProgressBar
                aktivtTrin={aktivtTrin}
                antalTrin={trin.length}
            />

            <div className="calculator-panel flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                <StepRenderer aktivtTrin={aktivtTrin} />

            </div>

            <WizardFooter
                kanGåTilbage={aktivtTrin > 0}
                kanGåVidere={Boolean(data.adresse?.id)}
                erSidsteTrin={
                    aktivtTrin ===
                    trin.length - 1
                }
                vedTilbage={forrigeTrin}
                vedNæste={næsteTrin}
            />
        </main>
    );
}
