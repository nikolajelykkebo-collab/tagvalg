import Link from "next/link";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Logo height={28} />

        <Link
          href="/sadan-virker-det"
          className="text-xs font-medium text-gray-500 transition-colors hover:text-emerald-700"
        >
          Sådan virker det
        </Link>

        <p className="text-xs text-gray-500">
          © 2026 Tagvalg · CVR 00000000 · Vejle
        </p>
      </div>
    </footer>
  );
}
