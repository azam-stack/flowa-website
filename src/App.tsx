import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CommitmentsBar } from "@/components/CommitmentsBar";
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

// ClientLogos (C1 of the restructure brief) is deliberately NOT mounted:
// content.clients is empty, and the brief requires the section not be
// mounted at all in that state — not rendered-but-empty. The component
// stays in the codebase (src/components/ClientLogos.tsx) for when real
// clients exist.

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Nav />
      <main>
        {/* 1. Hero, with CommitmentsBar attached to its base — one section, not two */}
        <Hero />
        <CommitmentsBar />

        {/* 2 */}
        <Problem />
        {/* 3 */}
        <Offer />
        {/* 4 */}
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
