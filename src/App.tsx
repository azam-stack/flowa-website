import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";
import { Hero } from "@/sections/Hero";
import { Problem } from "@/sections/Problem";
import { Offer } from "@/sections/Offer";
import { RiskBand } from "@/sections/RiskBand";
import { HowItWorks } from "@/sections/HowItWorks";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { Team } from "@/sections/Team";
import { Pricing } from "@/sections/Pricing";
import { GetStarted } from "@/sections/GetStarted";

/**
 * Nine sections, each answering one question (UI/UX plan §8):
 * 1 Hero (+ logo strip) · 2 Problem · 3 Offer + services · 4 RiskBand
 * (the deal) · 5 How it works · 6 Comparison · 7 Team · 8 Pricing ·
 * 9 FAQ + Get started · Footer.
 */
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Nav />
      <main id="main">
        <Hero />
        <ClientLogos />
        <Problem />
        <Offer />
        <RiskBand />
        <HowItWorks />
        <ComparisonTable />
        <Team />
        <Pricing />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
