import Link from "next/link";

import Logo from "./Logo";

const navLinks = [
  { href: "#saadan-virker-det", label: "Sådan virker det" },
  { href: "#om-os", label: "Om os" },
  { href: "/beregner", label: "Priser" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo height={36} priority />

        <nav
          aria-label="Hovednavigation"
          className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex"
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

        <a
          href="tel:31414524"
          className="inline-flex shrink-0 items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Ring 31 41 45 24
        </a>
      </div>
    </header>
  );
}
