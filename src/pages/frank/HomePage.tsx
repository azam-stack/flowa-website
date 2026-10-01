import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { AskBox } from "@/components/frank/AskBox";
import { FaqList } from "@/components/frank/FaqList";
import { SmartLink } from "@/components/SmartLink";
import { Hero } from "@/components/frank/Hero";
import { Marquee } from "@/components/frank/Marquee";
import { MeetFrank } from "@/components/frank/MeetFrank";
import { ClientResults, StatsStrip } from "@/components/frank/Proof";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { TeamBand } from "@/components/frank/TeamBand";
import { TabbedFeature } from "@/components/frank/TabbedFeature";
import { Testimonials } from "@/components/frank/Testimonials";
import { ComplianceSection, EngagementTimeline, PromiseBand } from "@/components/frank/TrustSections";
import { UseCases } from "@/components/frank/UseCases";
import { WhoFrankHelps } from "@/components/frank/WhoFrankHelps";
import { home } from "@/content/frank/home";
import { faqJsonLd, useSeo } from "@/lib/seo";

/**
 * The homepage, in the order a buyer's questions come up: who are you and
 * does it work (hero, logos, numbers), how (signals, use cases, Frank, the
 * people), what working together looks like and what it costs me if it
 * doesn't work (engagement, promise), proof (results), is it safe
 * (compliance), then contact and FAQ.
 */
export function HomePage() {
  useSeo({ title: home.seo.title, description: home.seo.description, path: "/", jsonLd: [faqJsonLd(home.faq.items)] });
  return (
    <>
      <Hero />
      <Marquee className="mt-6 md:mt-10" />
      <StatsStrip className="mt-10 md:mt-14" />
      <TabbedFeature />
      <UseCases />
      <MeetFrank />
      <TeamBand />
      <EngagementTimeline />
      <PromiseBand />
      <WhoFrankHelps />
      <ClientResults />
      <ComplianceSection />
      <ContactBand />
      {/* Hidden until approved client quotes exist */}
      <Testimonials />
      <Section id="faq">
        <Container>
          <SectionHeading title={home.faq.h2} />
          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            <FaqList items={home.faq.items.filter((i) => (home.faq.homeQuestions as readonly string[]).includes(i.q))} />
            <div className="mt-6 flex justify-center">
              <SmartLink href={home.faq.allLink.href} className="text-[15px] font-medium text-brand-deep underline underline-offset-4">
                {home.faq.allLink.label}
              </SmartLink>
            </div>
            <AskBox className="mt-10" />
          </div>
        </Container>
      </Section>
    </>
  );
}
