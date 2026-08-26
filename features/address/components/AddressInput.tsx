"use client";

import { Search } from "lucide-react";

interface Props {
  værdi: string;
  vedÆndring: (værdi: string) => void;
}

export default function AddressInput({
  værdi,
  vedÆndring,
}: Props) {
  return (
    <div className="relative">

      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-slate-400" />

      <input
        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-4 pl-11 text-base outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        placeholder="Søg efter adresse..."
        value={værdi}
        onChange={(event) => vedÆndring(event.target.value)}
      />

    </div>
  );
}
