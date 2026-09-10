"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

interface Props {
  spørgsmål: string;
  svar: string;
}

export default function FaqItem({ spørgsmål, svar }: Props) {
  const [åben, sætÅben] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <h3>
        <button
          type="button"
          aria-expanded={åben}
          onClick={() =>
            sætÅben((forrige) => !forrige)
          }
          className="flex w-full items-center justify-between gap-4 p-6 text-left"
        >
          <span className="flex min-h-[3.25rem] items-center text-base font-bold text-gray-900">
            {spørgsmål}
          </span>

          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <ChevronDown
              className={`size-4 text-emerald-700 transition-transform duration-300 ${
                åben ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          åben ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-gray-600">
          {svar}
        </p>
      </div>
    </div>
  );
}
