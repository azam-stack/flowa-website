import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";
import { Hero } from "@/sections/Hero";
import { Offer } from "@/sections/Offer";
import { RiskBand } from "@/sections/RiskBand";
import { HowItWorks } from "@/sections/HowItWorks";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { Team } from "@/sections/Team";
import { Pricing } from "@/sections/Pricing";
import { GetStarted } from "@/sections/GetStarted";

/**
 * In the order a visitor asks: what is it (Hero) · who we've booked for
 * (logos) · what do I get (Offer) · how does it work · what do I risk
 * (the deal) · why not an SDR or agency · who does the work · what does
 * it cost · what am I unsure about, and how do I start.
 */
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ClientLogos />
        <Offer />
        <HowItWorks />
        <RiskBand />
        <ComparisonTable />
        <Team />
        <Pricing />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
