import { Container } from "@/components/Container";
import { FaqList } from "@/components/frank/FaqList";
import { Sparkle } from "@/components/frank/Icons";
import { Marquee } from "@/components/frank/Marquee";
import { PricingCard } from "@/components/frank/PricingQuiz";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { FinalCta } from "@/components/frank/StatementBand";
import { Testimonials } from "@/components/frank/Testimonials";
import { ComplianceSection, EngagementTimeline, PromiseBand } from "@/components/frank/TrustSections";
import { Reveal } from "@/components/Reveal";
import { pricing as t } from "@/content/frank/pricing";
import { breadcrumbJsonLd, faqJsonLd, useSeo } from "@/lib/seo";

/** /pricing: the quote quiz, the marquee, "Every engagement includes", the hidden carousel, the pricing FAQ and the final CTA. No prices anywhere. */
export function PricingPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/pricing", jsonLd: [faqJsonLd(t.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])] });
  return (
    <>
      <section className="pt-5 md:pt-8">
        <Container>
          <PricingCard />
        </Container>
      </section>
      <Marquee className="mt-6 md:mt-10" />
      <Section tone="white">
        <Container>
          <SectionHeading title={t.includes.h2} />
          <Reveal stagger as="ul" className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-4 md:mt-14 md:grid-cols-2">
            {t.includes.items.map((i) => (
              <li key={i} className="flex items-center gap-3 border-b border-line pb-4 text-[17px] text-ink">
                <Sparkle size={18} className="flex-none text-ink" />
                {i}
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
      <PromiseBand />
      <EngagementTimeline />
      <ComplianceSection />
      <Testimonials />
      <Section>
        <Container>
          <SectionHeading title={t.faq.h2} />
          <FaqList items={t.faq.items} className="mx-auto mt-10 max-w-3xl md:mt-14" />
        </Container>
      </Section>
      <FinalCta h2={t.finalCta.h2} cta={t.finalCta.cta} ctaHref="#quote" trackLabel="pricing_get_my_quote" />
    </>
  );
}
