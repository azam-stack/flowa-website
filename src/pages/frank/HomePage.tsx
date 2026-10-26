import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { AskBox } from "@/components/frank/AskBox";
import { FaqList } from "@/components/frank/FaqList";
import { SmartLink } from "@/components/SmartLink";
import { Hero } from "@/components/frank/Hero";
import { TheMeeting } from "@/components/frank/TheMeeting";
import { SignalMoment } from "@/components/frank/SignalMoment";
import { SnapshotBand } from "@/pages/frank/SnapshotPage";
import { StatsStrip } from "@/components/frank/Proof";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { TeamBand } from "@/components/frank/TeamBand";
import { SdrMath } from "@/components/frank/SdrMath";
import { UseCases } from "@/components/frank/UseCases";
import { Testimonials } from "@/components/frank/Testimonials";
import { ComplianceSection, EngagementTimeline, PromiseBand } from "@/components/frank/TrustSections";
import { WhoFrankHelps } from "@/components/frank/WhoFrankHelps";
import { home } from "@/content/frank/home";
import { faqJsonLd, useSeo } from "@/lib/seo";

/**
 * The homepage, in the order a buyer decides: what is the deal (hero), what
 * do I get (the meeting), what is my alternative (SDR math), why are the
 * meetings good (the moment), what am I paying for (promise), does it work (numbers, results), what do you run
 * (use cases), who are you (team, engagement), is it for me, is it safe,
 * contact, FAQ, and the free market snapshot as the last word.
 */
export function HomePage() {
  useSeo({ title: home.seo.title, description: home.seo.description, path: "/", jsonLd: [faqJsonLd(home.faq.items)] });
  return (
    <>
      <Hero />
      <TheMeeting />
      <SdrMath />
      <SignalMoment />
      <PromiseBand />
      <StatsStrip className="mt-2 md:mt-4" />
      <UseCases />
      <TeamBand />
      <EngagementTimeline />
      <WhoFrankHelps />
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
      <div className="pb-16 md:pb-24">
        <SnapshotBand />
      </div>
    </>
  );
}
