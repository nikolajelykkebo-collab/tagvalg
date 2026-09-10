import FaqItem from "./FaqItem";

export const faq = [
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

export default function FaqSection() {
  return (
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
  );
}
