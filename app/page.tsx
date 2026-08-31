import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  House,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";



const faqs = [
  ["Hvordan beregnes prisen?", "Estimaten tager udgangspunkt i dit tagareal, tagtype og de valg, du foretager i beregneren. Den giver dig et realistisk budget at arbejde videre fra."],
  ["Er beregningen gratis?", "Ja. Du kan bruge beregneren gratis og uden forpligtelser."],
  ["Hvor lang tid tager det?", "De fleste er igennem på omkring to minutter. Har du din adresse ved hånden, går det endnu hurtigere."],
];

export default function Page() {
  return (
    <main className="landing-page">
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

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> Din genvej til et bedre tagprojekt</div>
          <h1>Hvad koster dit <em>nye tag?</em></h1>
          <p className="hero-lead">Få et realistisk prisestimat på få minutter. Vi bruger din adresse og husets data, så du kan planlægge med ro i maven.</p>
          <Link className="primary-button" href="/beregner">Start din beregning <ArrowRight size={19} /></Link>
          <div className="hero-notes">
            <span><Check size={15} /> Gratis og anonym</span>
            <span><Check size={15} /> Svar på 2 minutter</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Et moderne hus med nyt tag">
          <div className="visual-stamp"><strong>Det' Nemt</strong></div>
          <div className="visual-caption"><span className="caption-dot" /> Beregnet ud fra danske boligdata</div>
        </div>
      </section>


      <section className="process-section" id="saadan-virker-det">
        <div className="section-intro"><p className="section-kicker">Fra spørgsmål til overblik</p><h2>Et bedre udgangspunkt<br />for dit næste tag.</h2></div>
        <div className="process-grid">
          <article><span className="step-number">01</span><House size={25} /><h3>Find din bolig</h3><p>Indtast din adresse, så henter vi de vigtigste boligdata automatisk.</p></article>
          <article><span className="step-number">02</span><Sparkles size={25} /><h3>Fortæl om taget</h3><p>Vælg tagtype og tilpas de detaljer, der betyder noget for dit projekt.</p></article>
          <article><span className="step-number">03</span><Clock3 size={25} /><h3>Se din pris</h3><p>Få et konkret prisestimat, du kan bruge til at komme trygt videre.</p></article>
        </div>
      </section>

      <section className="estimate-section">
        <div><p className="section-kicker">Tag beslutningen med dig</p><h2>Du behøver ikke kende<br />alle svarene endnu.</h2><p>Et nyt tag er en stor beslutning. Derfor starter vi med et overslag, der gør mulighederne tydelige, før du tager kontakt til en håndværker.</p><Link className="text-link" href="/beregner">Beregn din pris <ArrowRight size={17} /></Link></div>
        <div className="estimate-card"><div className="mini-top"><span>Dit prisestimat</span><span className="live-dot">● Opdateret</span></div><div className="estimate-price">ca. 186.000 <small>kr.</small></div><div className="estimate-line"><span /> <span /> <span /> <span /> <span /></div><div className="estimate-foot"><span>Typisk interval</span><strong>150.000 - 225.000 kr.</strong></div></div>
      </section>

     

      <section className="faq-section" id="faq"><div><p className="section-kicker">Godt at vide</p><h2>Spørgsmål til<br />beregningen?</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="final-cta"><p className="section-kicker">Klar til at komme videre?</p><h2>Start med et prisestimat,<br /><em>og få ro på projektet.</em></h2><Link className="primary-button light-button" href="/beregner">Beregn pris på dit tag <ArrowRight size={19} /></Link></section>

      <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark"><House size={18} /></span><span>Tag<span>udregner</span></span></Link><p>Et bedre overblik over dit næste tag.</p><span>© 2026 Tagudregner</span></footer>
    </main>
  );
}