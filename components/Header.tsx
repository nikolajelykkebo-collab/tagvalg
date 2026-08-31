import Link from "next/link";
import { ArrowRight, House } from "lucide-react";

export default function Header() {
  return (
    <nav className="site-nav" aria-label="Hovednavigation">
      <Link className="brand" href="/">
        <span className="brand-mark"><House size={18} strokeWidth={2.5} /></span>
        <span>Tag<span>valg</span></span>
      </Link>
      <div className="nav-links">
        <a href="#saadan-virker-det">Sådan virker det</a>
        <a href="#faq">Spørgsmål</a>
        <Link className="nav-cta" href="/beregner">Beregn pris <ArrowRight size={16} /></Link>
      </div>
    </nav>
  );
}
