import {
  Home,
  Building2,
  Layers,
  Calculator,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

import { Trin } from "../types";

export const trin = [
  Trin.Adresse,
  Trin.Ejendom,
  Trin.Tag,
  Trin.Beregning,
  Trin.Resultat,
] as const;

export const trinInfo: Record<
  (typeof trin)[number],
  { label: string; ikon: LucideIcon }
> = {

  [Trin.Adresse]: {
    label: "Adresse",
    ikon: Home,
  },

  [Trin.Ejendom]: {
    label: "Ejendom",
    ikon: Building2,
  },

  [Trin.Tag]: {
    label: "Tag",
    ikon: Layers,
  },

  [Trin.Beregning]: {
    label: "Beregning",
    ikon: Calculator,
  },

  [Trin.Resultat]: {
    label: "Resultat",
    ikon: PartyPopper,
  },

};
