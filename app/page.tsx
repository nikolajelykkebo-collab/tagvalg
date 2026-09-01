import Link from "next/link";

import Header from "../components/Header";
import Logo from "../components/Logo";
import HeroAddressSearch from "../features/address/components/HeroAddressSearch";

const fordele = [
  {
    nummer: "01",
    titel: "Automatisk beregning",
    tekst:
      "Få en pris du faktisk kan bruge som udgangspunkt for dit budget — beregnet direkte ud fra din adresse.",
  },
  {
    nummer: "02",
    titel: "100% gratis",
    tekst:
      "Brug beregneren så mange gange du vil, helt uden beregning. Gem og send dine overslag videre.",
  },
  {
    nummer: "03",
    titel: "Alle tagtyper",
    tekst:
      "Tegl, beton, stål eller tagpap — beregneren dækker de mest almindelige tagløsninger på markedet.",
  },
];

const styrker = [
  {
    titel: "Høj kvalitet",
    tekst:
      "Dedikeret team med svendebrev og 30 års samlet erfaring i tagbranchen.",
  },
  {
    titel: "Personlig service",
    tekst:
      "Løbende dialog gennem hele forløbet, så du undgår unødvendige overraskelser.",
  },
  {
    titel: "God rådgivning",
    tekst:
      "Vi starter altid med grundig rådgivning, så vi sammen kan lægge den rette plan.",
  },
];

export default function Page() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
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

          <p className="mt-5 text-xs font-medium text-gray-400">
            Ingen forpligtelser · Svar med det samme · Bruges af 1.000+ boligejere
          </p>
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
                key={fordel.nummer}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-800">
                  {fordel.nummer}
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
      <section id="om-os" className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            Hvorfor skal du vælge os?
          </p>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {styrker.map((styrke) => (
              <div key={styrke.titel}>
                <h3 className="text-lg font-bold text-gray-900">
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

      {/* CTA-banner */}
      <section className="px-6 pb-20 sm:pb-24">
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

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <Logo height={28} />

          <p className="text-xs text-gray-500">
            © 2026 Tagvalg · CVR 00000000 · Vejle
          </p>
        </div>
      </footer>
    </main>
  );
}
