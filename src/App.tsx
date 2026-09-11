import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { TrustBar } from "@/sections/TrustBar";
import { Problems } from "@/sections/Problems";
import { ValueProps } from "@/sections/ValueProps";
import { PipelineFunnel } from "@/sections/PipelineFunnel";
import { Differentiator } from "@/sections/Differentiator";
import { HowItWorks } from "@/sections/HowItWorks";
import { Team } from "@/sections/Team";
import { Services } from "@/sections/Services";
import { Audience } from "@/sections/Audience";
import { CaseStudies } from "@/sections/CaseStudies";
import { WhyFlowa } from "@/sections/WhyFlowa";
import { WhatSetsUsApart } from "@/sections/WhatSetsUsApart";
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
        <Problems />
        <ValueProps />
        <PipelineFunnel />
        <Differentiator />
        <HowItWorks />
        <Team />
        <Services />
        <Audience />
        <CaseStudies />
        <WhyFlowa />
        <WhatSetsUsApart />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
