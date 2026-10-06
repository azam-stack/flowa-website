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

/** Flowa next to hiring an SDR and running outbound software yourself. */
function Compare() {
  const c = t.compare;
  return (
    <Section tone="white" id="compare">
      <Container>
        <SectionHeading title={<>{c.h2Light}<span className="font-semibold">{c.h2Bold}</span></>} sub={c.sub} />
        <Reveal className="mx-auto mt-10 max-w-5xl md:mt-14">
          <div className="hidden overflow-hidden rounded-frame border border-ink md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[22%] bg-soft p-5" />
                  {c.columns.map((col, i) => (
                    <th key={col} scope="col" className={`p-5 text-[16px] font-semibold ${i === 2 ? "bg-ink text-white" : "bg-soft text-ink"}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.label} className="border-t border-line">
                    <th scope="row" className="bg-white p-5 align-top text-[14px] font-medium text-muted">{r.label}</th>
                    {r.cells.map((cell, i) => (
                      <td key={i} className={`p-5 align-top text-[15px] leading-snug ${i === 2 ? "bg-brand/10 font-semibold text-ink" : "bg-white text-ink-2"}`}>
                        {i === 2 && <Check size={14} className="mr-1.5 inline -translate-y-px text-ink" />}
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            {c.columns.map((col, i) => (
              <div key={col} className={`rounded-frame border p-5 ${i === 2 ? "border-2 border-ink bg-white shadow-lift" : "border-line bg-white"}`}>
                <h3 className="text-[17px] font-semibold text-ink">{col}</h3>
                <dl className="mt-3 flex flex-col gap-3">
                  {c.rows.map((r) => (
                    <div key={r.label}>
                      <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted">{r.label}</dt>
                      <dd className={`mt-0.5 text-[15px] ${i === 2 ? "font-semibold text-ink" : "text-ink-2"}`}>{r.cells[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-small text-muted">{c.footnote}</p>
        </Reveal>
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
      <Compare />
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
