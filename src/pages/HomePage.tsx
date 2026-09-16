import { ClientLogos } from "@/components/ClientLogos";
import { ProofStrip } from "@/components/ProofStrip";
import { Hero } from "@/sections/Hero";
import { Offer } from "@/sections/Offer";
import { RiskBand } from "@/sections/RiskBand";
import { HowItWorks } from "@/sections/HowItWorks";
import { WhoWeHelp } from "@/sections/WhoWeHelp";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { Team } from "@/sections/Team";
import { PricingOverview } from "@/components/pricing/PricingOverview";
import { GetStarted } from "@/sections/GetStarted";
import { useSeo, faqJsonLd } from "@/lib/seo";
import { meta, faq } from "@/content/site.en";

/**
 * In the order a visitor asks: what is it (Hero) · who we've booked for
 * (logos) · what do I get (Offer) · how does it work · who is it for ·
 * what do I risk (the deal) · why not an SDR or agency · who does the
 * work · what does it cost · what am I unsure about, and how do I start.
 */
export function HomePage() {
  useSeo({ title: meta.title, description: meta.description, path: "/", jsonLd: [faqJsonLd(faq.items)] });
  return (
    <>
      <Hero />
      <ClientLogos />
      <ProofStrip />
      <Offer />
      <HowItWorks />
      <WhoWeHelp />
      <RiskBand />
      <ComparisonTable />
      <Team />
      <PricingOverview />
      <GetStarted />
    </>
  );
}
