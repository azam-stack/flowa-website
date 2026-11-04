import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { FaqList } from "@/components/frank/FaqList";
import { SmartLink } from "@/components/SmartLink";
import { Hero } from "@/components/frank/Hero";
import { ChannelLoop } from "@/components/frank/ChannelLoop";
import { SignalMoment } from "@/components/frank/SignalMoment";
import { StatsStrip } from "@/components/frank/Proof";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { TeamBand } from "@/components/frank/TeamBand";
import { SdrMath } from "@/components/frank/SdrMath";
import { Testimonials } from "@/components/frank/Testimonials";
import { home } from "@/content/frank/home";
import { faqJsonLd, useSeo } from "@/lib/seo";

/**
 * The homepage: eight sections, one idea each. What is the deal (hero),
 * what do I get (the meeting), what is my alternative (SDR math), why are
 * the meetings good (the moment), the numbers, who are you (team), the
 * five questions buyers ask, and one way to get in touch. Use cases,
 * the engagement plan, fit and compliance live on their own pages.
 */
export function HomePage() {
  useSeo({ title: home.seo.title, description: home.seo.description, path: "/", jsonLd: [faqJsonLd(home.faq.items)] });
  return (
    <>
      <Hero />
      <ChannelLoop />
      <div className="hatch" />
      <SignalMoment />
      <div className="hatch" />
      <SdrMath />
      <div className="hatch" />
      <StatsStrip className="mt-2 md:mt-4" />
      <TeamBand />
      <div className="hatch" />
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
          </div>
        </Container>
      </Section>
      <div className="hatch" />
      <ContactBand />
    </>
  );
}
