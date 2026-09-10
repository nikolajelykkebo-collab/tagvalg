import type { Metadata } from "next";

import Link from "next/link";

import { MapPin, CircleHelp, Mail, BarChart3 } from "lucide-react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FaqItem from "./FaqItem";

export const metadata: Metadata = {
  title: "Sådan virker det | Tagvalg",
  description:
    "Se hvordan Tagvalgs tagberegner virker: indtast din adresse, svar på et par spørgsmål om dit tag, og få et gratis prisestimat på nyt tag på under et minut.",
};

const trin = [
  {
    nummer: "1",
    titel: "Indtast din adresse",
    tekst:
      "Skriv adressen på den ejendom du vil have tag på, så henter vi automatisk oplysninger om ejendommen.",
    Ikon: MapPin,
  },
  {
    nummer: "2",
    titel: "Svar på et par spørgsmål",
    tekst:
      "Fortæl os om tagtype, taghældning og tagets nuværende tilstand.",
    Ikon: CircleHelp,
  },
  {
    nummer: "3",
    titel: "Udfyld dine kontaktoplysninger",
    tekst:
      "Så vi kan sende dig dit personlige prisestimat baseret på dine svar.",
    Ikon: Mail,
  },
  {
    nummer: "4",
    titel: "Modtag dit prisestimat",
    tekst:
      "Du får dit prisoverslag, og en af vores samarbejdspartnere kontakter dig med et uforpligtende tilbud.",
    Ikon: BarChart3,
  },
];

const faq = [
  {
    spørgsmål: "Er det gratis at bruge tagberegneren?",
    svar:
      "Ja, det er helt gratis og uforpligtende at få et prisestimat på dit nye tag med Tagvalgs beregner.",
  },
  {
    spørgsmål: "Hvor præcist er prisestimatet?",
    svar:
      "Estimatet er baseret på oplysninger om din ejendom samt dine svar om tagtype, hældning og tilstand, og giver et realistisk bud på prisniveauet. Den endelige pris fastsættes altid af en håndværker efter besigtigelse.",
  },
  {
    spørgsmål: "Hvor kommer oplysningerne om min ejendom fra?",
    svar:
      "Vi henter automatisk oplysninger om din ejendom fra BBR (Bygnings- og Boligregistret). BBR-data opdateres ikke altid løbende, og der kan derfor forekomme afvigelser i forhold til ejendommens faktiske stand. Tagvalg fraskriver sig ansvar for unøjagtigheder i de hentede BBR-data, og prisestimatet skal ses som vejledende.",
  },
  {
    spørgsmål: "Hvor lang tid tager det at bruge beregneren?",
    svar: "De fleste er igennem alle trin og har et estimat på under et minut.",
  },
  {
    spørgsmål: "Hvilke tagtyper kan jeg beregne pris på?",
    svar:
      "Du kan få et prisestimat på tagpap, stål, eternit, betontagsten, tegl, stråtag og naturskifer.",
  },
];

const faqVenstre = faq.slice(0, 3);
const faqHøjre = faq.slice(3);

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((spg) => ({
    "@type": "Question",
    name: spg.spørgsmål,
    acceptedAnswer: {
      "@type": "Answer",
      text: spg.svar,
    },
  })),
};

export default function SådanVirkerDetPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            Sådan virker det
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sådan virker vores tagberegner
          </h1>

          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            Få et gratis og gennemsigtigt prisoverslag på dit nye tag online
            — på under et minut, uden forpligtelser og uden at skulle vente
            på et tilbud fra en håndværker.
          </p>
        </div>
      </section>

      {/* Sådan kommer du fra adresse til pris */}
      <section className="bg-stone-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              Sådan kommer du fra adresse til pris på 4 trin
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
              Hele processen foregår online, og du får svar med det samme
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trin.map((t) => (
              <div
                key={t.nummer}
                className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <span className="absolute -top-4 left-7 inline-flex size-8 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-white">
                  {t.nummer}
                </span>

                <div className="mt-2 inline-flex size-12 items-center justify-center rounded-xl bg-emerald-50">
                  <t.Ikon className="size-6 text-emerald-800" />
                </div>

                <p className="mt-5 text-lg font-bold text-gray-900">
                  {t.titel}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {t.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-tekst */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Få et realistisk prisoverslag på nyt tag, før du kontakter en
            håndværker
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-600">
            <p>
              At skulle udskifte taget er en stor beslutning, og prisen kan
              variere meget afhængigt af tagtype, tagets hældning, størrelsen
              på huset og tagets nuværende stand. Med Tagvalgs tagberegner
              får du et konkret prisestimat på dit nye tag med det samme,
              baseret på oplysninger om netop din ejendom — uden at du
              behøver indhente flere tilbud fra håndværkere først.
            </p>

            <p>
              Beregneren tager udgangspunkt i din adresse og henter
              automatisk relevante oplysninger om ejendommen fra BBR
              (Bygnings- og Boligregistret). Du udfylder derefter et par
              simple spørgsmål om tagtype og tagets tilstand, og på baggrund
              af det beregner vi en realistisk pris på dit nye tag — uanset
              om du overvejer tagpap, stål, eternit, betontagsten, tegl,
              stråtag eller naturskifer.
            </p>

            <p>
              Oplysningerne fra BBR opdateres ikke altid i takt med
              virkeligheden, og der kan derfor forekomme afvigelser mellem
              de registrerede data og ejendommens faktiske stand. Tagvalg
              kan ikke drages til ansvar for eventuelle unøjagtigheder i de
              hentede BBR-data, og prisestimatet skal derfor altid betragtes
              som vejledende.
            </p>

            <p>
              Det er helt gratis at bruge tagberegneren. Når du har svaret
              på spørgsmålene om dit tag, udfylder du dine
              kontaktoplysninger, så vi kan sende dig dit personlige
              prisestimat. Derefter kontakter en af vores
              samarbejdspartnere dig med et uforpligtende tilbud.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-gray-100 bg-stone-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Ofte stillede spørgsmål om tagberegneren
          </h2>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="flex flex-1 flex-col gap-4">
              {faqVenstre.map((spg) => (
                <FaqItem
                  key={spg.spørgsmål}
                  spørgsmål={spg.spørgsmål}
                  svar={spg.svar}
                />
              ))}
            </div>

            <div className="flex flex-1 flex-col gap-4">
              {faqHøjre.map((spg) => (
                <FaqItem
                  key={spg.spørgsmål}
                  spørgsmål={spg.spørgsmål}
                  svar={spg.svar}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA-banner */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-900 px-8 py-12 sm:px-12">
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Klar til at se din pris?
              </h2>

              <p className="mt-2 text-sm text-emerald-100">
                Det tager under et minut at komme i gang.
              </p>
            </div>

            <Link
              href="/beregner"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              Start beregneren →
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </main>
  );
}
