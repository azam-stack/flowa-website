import { Container } from "@/components/Container";
import { FaqList } from "@/components/frank/FaqList";
import { Btn } from "@/components/frank/Btn";
import { Check, Sparkle } from "@/components/frank/Icons";
import { Marquee } from "@/components/frank/Marquee";
import { PricingCard } from "@/components/frank/PricingQuiz";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { FinalCta } from "@/components/frank/StatementBand";
import { Testimonials } from "@/components/frank/Testimonials";
import { ComplianceSection, EngagementTimeline, PromiseBand } from "@/components/frank/TrustSections";
import { Reveal } from "@/components/Reveal";
import type { CSSProperties } from "react";
import { pricing as t } from "@/content/frank/pricing";
import { breadcrumbJsonLd, faqJsonLd, useSeo } from "@/lib/seo";

/** The three published starting points: Pilot per meeting, Monthly from, Scale on request. The onboarding fee is never shown. */
function Plans() {
  const p = t.plans;
  return (
    <Section id="plans">
      <Container>
        <SectionHeading title={<>{p.h2Light}<span className="font-semibold">{p.h2Bold}</span></>} sub={p.sub} />
        <Reveal stagger as="ul" className="mx-auto mt-10 grid max-w-6xl items-stretch gap-7 lg:gap-5 md:mt-14 lg:grid-cols-3">
          {p.items.map((plan, i) => (
            <li
              key={plan.name}
              style={{ "--i": i } as CSSProperties}
              className={`relative flex flex-col rounded-frame bg-white p-7 md:p-8 ${plan.featured ? "border-2 border-ink shadow-lift lg:-my-3 lg:py-11" : "border border-line"}`}
            >
              {"badge" in plan && plan.badge && <span className="absolute -top-3.5 left-7 rounded-pill bg-brand px-3 py-1 text-[12px] font-semibold text-ink">{plan.badge}</span>}
              <h3 className="text-[15px] font-medium uppercase tracking-[0.08em] text-brand-deep">{plan.name}</h3>
              <p className="mt-4">
                <span className="block whitespace-nowrap text-[clamp(2.25rem,1.8rem+1.2vw,3rem)] font-light leading-none tracking-[-0.03em] text-ink">{plan.price}</span>
                <span className="mt-2 block h-5 text-[15px] text-muted">{plan.unit}</span>
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{plan.body}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                {plan.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[15px] text-ink">
                    <Check size={16} className="mt-1 flex-none text-ink" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Btn href={plan.href} variant={plan.featured ? "primary" : "outline"} className="mt-8 w-full justify-center" trackLabel={`pricing_plan_${plan.name.toLowerCase()}`}>
                {plan.cta}
              </Btn>
            </li>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-small text-muted">{p.footnote}</p>
      </Container>
    </Section>
  );
}

/** /pricing: the quote quiz, the published starting prices, the marquee, "Every engagement includes", the pricing FAQ and the final CTA. */
export function PricingPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/pricing", jsonLd: [faqJsonLd(t.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])] });
  return (
    <>
      <section className="pt-5 md:pt-8">
        <Container>
          <PricingCard />
        </Container>
      </section>
      <Plans />
      <Marquee className="mt-2 md:mt-4" />
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
