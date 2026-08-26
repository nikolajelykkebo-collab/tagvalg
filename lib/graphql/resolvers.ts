import { datafordelerService } from "@/lib/datafordeler/facade/datafordeler.service";

export const resolvers = {
  Query: {
    async addressSuggestions(
      _: unknown,
      { search }: { search: string }
    ) {
      const adresser = await datafordelerService.hentAdresseForslag(search);

      return adresser.map((adresse) => ({
        id: adresse.id,
        text: adresse.tekst,
      }));
    },
  },
};