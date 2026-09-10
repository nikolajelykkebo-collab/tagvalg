import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function KontaktPage() {
  return (
    <main className="bg-white">
      <Header />

      <section className="bg-gradient-to-b from-emerald-50 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kontakt
          </h1>

          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            Indhold på vej.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
