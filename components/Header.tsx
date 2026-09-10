import Link from "next/link";

import Logo from "./Logo";

const navLinks = [
  { href: "/sadan-virker-det", label: "Sådan virker det" },
  { href: "/om-os", label: "Om os" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo height={36} priority />

        <nav
          aria-label="Hovednavigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-gray-600 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/beregner"
          className="inline-flex shrink-0 items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Gå til prisberegner
        </Link>
      </div>
    </header>
  );
}
