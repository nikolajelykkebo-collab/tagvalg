"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  kanGåTilbage: boolean;
  kanGåVidere: boolean;
  erSidsteTrin: boolean;
  vedTilbage: () => void;
  vedNæste: () => void;
}

export default function WizardFooter({
  kanGåTilbage,
  kanGåVidere,
  erSidsteTrin,
  vedTilbage,
  vedNæste,
}: Props) {
  return (
    <div className="sticky bottom-0 mt-10 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/80 px-1 py-4 backdrop-blur-sm sm:static sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
      <Button
        variant="outline"
        size="lg"
        disabled={!kanGåTilbage}
        onClick={vedTilbage}
        className="calculator-secondary-button gap-1.5"
      >
        <ArrowLeft className="size-4" />
        Tilbage
      </Button>

      <Button
        size="lg"
        disabled={!kanGåVidere}
        onClick={vedNæste}
        className="calculator-primary-button gap-1.5"
      >
        {erSidsteTrin ? "Send" : "Næste"}
        {!erSidsteTrin && <ArrowRight className="size-4" />}
      </Button>
    </div>
  );
}
