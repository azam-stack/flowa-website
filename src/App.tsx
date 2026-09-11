import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { TrustBar } from "@/sections/TrustBar";
import { ValueProps } from "@/sections/ValueProps";
import { Differentiator } from "@/sections/Differentiator";
import { HowItWorks } from "@/sections/HowItWorks";
import { Services } from "@/sections/Services";
import { Audience } from "@/sections/Audience";
import { CaseStudies } from "@/sections/CaseStudies";
import { WhyFlowa } from "@/sections/WhyFlowa";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ValueProps />
        <Differentiator />
        <HowItWorks />
        <Services />
        <Audience />
        <CaseStudies />
        <WhyFlowa />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
