import Script from "next/script";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Wizard from "../../features/wizard/components/Wizard";

export default function BeregnerPage() {
    return (
        <>
            <Header />
            <Wizard />
            <Footer />

            {/* Cloudflare Turnstile — bruges på Kontakt-trinnet til
                bot-beskyttelse, før leadet kan sendes til Make. */}
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
            />
        </>
    );
}
