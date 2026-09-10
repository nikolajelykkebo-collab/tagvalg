import Link from "next/link";

import Logo from "./Logo";

const footerLinks = [
  { href: "/sadan-virker-det", label: "Sådan virker det" },
  { href: "/om-os", label: "Om os" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Logo height={28} />

        <nav
          aria-label="Footer-navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-gray-500 transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-gray-500">
          © 2026 Tagvalg · CVR 00000000 · Vejle
        </p>
      </div>
    </footer>
  );
}
