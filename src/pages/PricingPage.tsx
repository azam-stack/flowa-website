import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { Section, SectionHeader } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { BookCallLink } from "@/components/BookCallLink";
import { Reveal } from "@/components/Reveal";
import { PricingTable } from "@/components/pricing/PricingTable";
import { FaqSection } from "@/components/FaqSection";
import { packages, pricingPage, ongoingLabel } from "@/content/pricing";
import { useSeo, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;
const FALLBACK = "/#contact";

/**
 * /pricing, edited down to the decision: a short hero, the table, what
 * every engagement includes, the Pilot in three lines, seven questions,
 * one call to action. The table is the hero visual. Calmer than the home
 * page: no living object, no ambient motion, reveals only.
 */
export function PricingPage() {
  const c = pricingPage;
  const pilot = packages[0];
  useSeo({ title: c.seo.title, description: c.seo.description, path: "/pricing", jsonLd: [faqJsonLd(c.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])] });

  return (
    <>
      <section id="top" className="relative pb-6 pt-32 md:pb-8 md:pt-40 lg:pt-44">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-display text-[color:var(--flowa-text)]">
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {c.hero.headline[0]}
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line" style={T(210)}>
                  {c.hero.headline[1]}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
              {c.hero.sub}
            </p>
          </div>
        </Container>
      </section>

      <section id="packages" className="scroll-mt-20 pb-section pt-10 md:pt-14">
        <Container>
          <div className="hero-surface" style={T(520)}>
            <PricingTable />
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader title={c.includes.heading} lead={c.includes.body} />
            <Reveal delay={120} variant="near" className="lg:pt-2">
              <ul className="stagger grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {c.includes.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-border py-3.5 text-body text-fg">
                    <Check size={16} strokeWidth={2.5} className="mt-1.5 shrink-0 text-accent-display" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-body text-muted">
                <span className="font-semibold text-fg">{c.dataOwnership.heading}</span> {c.dataOwnership.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader title={c.pilot.heading} />
            <Reveal delay={120} variant="near" className="lg:pt-2">
              <p className="max-w-lead text-lead text-muted">{c.pilot.body}</p>
              <p className="mt-6 text-[22px] font-extrabold tracking-[-0.02em] text-fg md:text-[26px]">
                {ongoingLabel(pilot)} <span className="ml-2 text-[15px] font-medium text-muted">{c.table.perMeetingNote.toLowerCase()}</span>
              </p>
              <p className="mt-3 max-w-lead text-small text-muted">{c.pilot.terms}</p>
              <p className="mt-6 border-t border-border pt-5 text-small text-muted">
                <span className="font-semibold text-fg">{c.guarantee.line}</span> {c.guarantee.terms}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection heading={c.faq.heading} items={c.faq.items} service="pricing" />

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-fg">{c.cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-lead text-lead text-muted">{c.cta.body}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <BookCallLink id="hero-cta" location="pricing-cta" service="pricing" fallback={FALLBACK} size="lg" magnetic className="w-full sm:w-auto" />
              <LinkButton href={c.cta.secondary.href} variant="ghost" size="lg" arrow className="w-full sm:w-auto">
                {c.cta.secondary.label}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
