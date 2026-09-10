import Link from "next/link";

import {
  BadgeCheck,
  Calculator,
  CircleCheck,
  Gift,
  Layers,
  Lightbulb,
  MessagesSquare,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import HeroAddressSearch from "../features/address/components/HeroAddressSearch";

const tillidsindikatorer = [
  "100% gratis",
  "Under 1 minut",
  "Ingen forpligtelser",
];

const fordele = [
  {
    titel: "Automatisk beregning",
    tekst:
      "Få en pris du faktisk kan bruge som udgangspunkt for dit budget — beregnet direkte ud fra din adresse.",
    Ikon: Calculator,
  },
  {
    titel: "100% gratis",
    tekst:
      "Brug beregneren så mange gange du vil, helt uden beregning. Gem og send dine overslag videre.",
    Ikon: Gift,
  },
  {
    titel: "Alle tagtyper",
    tekst:
      "Tegl, beton, stål eller tagpap — beregneren dækker de mest almindelige tagløsninger på markedet.",
    Ikon: Layers,
  },
];

const styrker = [
  {
    titel: "Høj kvalitet",
    tekst:
      "Dedikeret team med svendebrev og 30 års samlet erfaring i tagbranchen.",
    Ikon: BadgeCheck,
  },
  {
    titel: "Personlig service",
    tekst:
      "Løbende dialog gennem hele forløbet, så du undgår unødvendige overraskelser.",
    Ikon: MessagesSquare,
  },
  {
    titel: "God rådgivning",
    tekst:
      "Vi starter altid med grundig rådgivning, så vi sammen kan lægge den rette plan.",
    Ikon: Lightbulb,
  },
];

export default function Page() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-emerald-50 to-white px-6 py-24 sm:py-32">
        {/* Blobbene skal klippes til sektionens kant, men uden at
            klippe adresse-dropdown'en herunder — derfor sidder
            overflow-hidden på denne separate baggrundslag-wrapper
            i stedet for på selve sektionen. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-emerald-200/40 blur-3xl sm:size-96" />

          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-emerald-200/40 blur-3xl sm:size-96" />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            100% gratis · Uforpligtende
          </span>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <span className="block whitespace-nowrap">Beregn pris på nyt tag</span>
            <span className="block whitespace-nowrap text-emerald-700">på kun 30 sekunder</span>
          </h1>

          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            Indtast din adresse og få et gratis prisoverslag på dit nye
            kvalitetstag — uanset tagtype.
          </p>

          <div className="mt-8">
            <HeroAddressSearch />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {tillidsindikatorer.map((tekst) => (
              <span
                key={tekst}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
              >
                <CircleCheck className="size-4 text-emerald-600" />
                {tekst}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hvorfor bruge vores tagberegner */}
      <section id="saadan-virker-det" className="bg-stone-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            Hvorfor bruge vores tagberegner?
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {fordele.map((fordel) => (
              <div
                key={fordel.titel}
                className="rounded-[20px] border border-gray-100 bg-gray-50 p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white">
                  <fordel.Ikon className="size-6" />
                </span>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {fordel.titel}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {fordel.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hvorfor skal du vælge os */}
      <section id="om-os" className="bg-emerald-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Hvorfor skal du vælge os?
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {styrker.map((styrke) => (
              <div
                key={styrke.titel}
                className="flex flex-col items-center text-center"
              >
                <span className="inline-flex size-16 items-center justify-center rounded-full bg-white shadow-md">
                  <styrke.Ikon className="size-7 text-emerald-600" />
                </span>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {styrke.titel}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {styrke.tekst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA-banner */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-900 px-8 py-12 sm:px-12">
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Klar til at se din pris?
              </h2>

              <p className="mt-2 text-sm text-emerald-100">
                Det tager under et minut, og du forpligter dig til ingenting.
              </p>
            </div>

            <Link
              href="/beregner"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              Beregn pris nu →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
