import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CommitmentsBar } from "@/components/CommitmentsBar";
import { ClientLogos } from "@/components/ClientLogos";
import { Hero } from "@/sections/Hero";
import { Problem } from "@/sections/Problem";
import { Offer } from "@/sections/Offer";
import { RiskBand } from "@/sections/RiskBand";
import { HowItWorks } from "@/sections/HowItWorks";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { Team } from "@/sections/Team";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";

// ClientLogos renders nothing while content.clients is empty (currently
// the case — see the TODO on `clients` in site.en.ts), so mounting it
// unconditionally here is safe: it's a no-op until real logos are wired
// in, at which point it's already in place at the base of the hero.

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Nav />
      <main>
        {/* 1. Hero, with ClientLogos attached to its base — one section, not two */}
        <Hero />
        <ClientLogos />

        {/* 2 */}
        <Problem />
        {/* 3 */}
        <Offer />
        {/* 4. CommitmentsBar attached directly above RiskBand — one section, not two */}
        <CommitmentsBar />
        <RiskBand />
        {/* 5 */}
        <HowItWorks />
        {/* 6 */}
        <ComparisonTable />
        {/* 7 — "Founders". FROZEN: Team.tsx content/markup unchanged, only its position moved here. */}
        <Team />
        {/* 8 */}
        <Pricing />
        {/* 9 */}
        <FAQ />
        {/* 10 — FinalCta, merged with the old standalone Contact form section */}
        <FinalCTA />
      </main>
      {/* 11 */}
      <Footer />
    </div>
  );
}
