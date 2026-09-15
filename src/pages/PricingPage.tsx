import { Users, Search, Server, PenLine, Plug, CalendarCheck, RefreshCw, LayoutDashboard, Database, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Section, SectionHeader } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { BookCallLink } from "@/components/BookCallLink";
import { Reveal } from "@/components/Reveal";
import { FlowaEngine } from "@/components/FlowaEngine";
import { FluidObject } from "@/components/FluidObject";
import { PricingTable } from "@/components/pricing/PricingTable";
import { StatsBand } from "@/components/StatsBand";
import { FaqSection } from "@/components/FaqSection";
import { LeadCta } from "@/components/LeadCta";
import { packages, pricingPage, gbp, ongoingLabel } from "@/content/pricing";
import { useSeo, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;
const ICONS = { users: Users, search: Search, server: Server, pen: PenLine, plug: Plug, "calendar-check": CalendarCheck, refresh: RefreshCw, dashboard: LayoutDashboard, database: Database } as const;

/**
 * /pricing: hero, the path (Pilot → Core → Plus → Scale), the comparison
 * table, what every engagement includes (with data ownership stated on
 * its own), the Pilot explained, how scaling works, the founders' proof,
 * FAQ, and the form. Every figure comes from src/content/pricing.ts.
 */
export function PricingPage() {
  const c = pricingPage;
  const pilot = packages[0];
  useSeo({ title: c.seo.title, description: c.seo.description, path: "/pricing", jsonLd: [faqJsonLd(c.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])] });

  return (
    <>
      <section id="top" className="atmosphere relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pt-44">
        <div className="hero-blur pointer-events-none absolute -right-[8%] top-[6%] hidden h-[560px] w-[560px] opacity-60 md:block" style={T(0)} aria-hidden="true">
          <FluidObject className="parallax parallax-slow h-full w-full" />
        </div>
        <Container className="relative z-[2]">
          <div className="max-w-3xl">
            <p className="hero-rise flex items-center gap-3 text-eyebrow text-muted" style={T(40)}>
              <span className="hero-rule h-px w-6 shrink-0 bg-accent" style={T(0)} aria-hidden="true" />
              {c.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-display text-[color:var(--flowa-text)]">
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {c.hero.headline}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
              {c.hero.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
              <div className="hero-rise" style={T(560)}>
                <BookCallLink id="hero-cta" location="pricing-hero" service="pricing" size="lg" arrow magnetic className="w-full sm:w-auto" />
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href={c.hero.ctaSecondary.href} variant="ghost" size="lg" className="w-full sm:w-auto" onClick={() => track("cta_click", { cta: c.hero.ctaSecondary.label, location: "pricing-hero" })}>
                  {c.hero.ctaSecondary.label}
                </LinkButton>
              </div>
            </div>
            {/* the twenty-second answers */}
            <dl className="hero-rise mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4" style={T(740)}>
              {[
                [gbp(pilot.setup), "to start: the Pilot setup"],
                [ongoingLabel(pilot), "in the Pilot"],
                ["45 / 100 / 170+", "meetings a year on Core / Plus / Scale"],
                ["Plus", "and Scale add phone booking"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-[13px] text-muted">{l}</dt>
                  <dd className="order-first text-[20px] font-extrabold tracking-[-0.02em] text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Section density="compact">
        <Container>
          <SectionHeader eyebrow={c.story.eyebrow} title={c.story.heading} lead={c.story.body} />
          <Reveal delay={160} className="mt-10 md:mt-12">
            <FlowaEngine stages={[...c.story.steps]} />
          </Reveal>
        </Container>
      </Section>

      <Section id="packages" className="scroll-mt-20">
        <Container>
          <SectionHeader eyebrow={c.table.eyebrow} title={c.table.heading} lead={c.table.body} />
          <Reveal delay={120} variant="surface" threshold={0.05} className="mt-12 md:mt-14">
            <PricingTable />
          </Reveal>
          <Reveal delay={200} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <div key={p.id} className="rounded-card border border-border bg-card p-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent-display">{p.name}</p>
                <p className="mt-1.5 text-[16px] font-semibold text-fg">{p.tagline}</p>
                <ul className="mt-3 space-y-1 text-[13px] text-muted">
                  {p.adds.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {i > 0 && a === p.adds[0] ? `Adds: ${a}` : a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="band" density="band" divider={false} className="band-depth relative overflow-hidden md:mx-4 md:rounded-panel lg:mx-6">
        <Container className="relative" style={{ zIndex: 2 }}>
          <SectionHeader tone="band" eyebrow={c.includes.eyebrow} title={c.includes.heading} lead={c.includes.body} />
          <Reveal delay={160} stagger className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {c.includes.items.map((it) => {
              const Icon = ICONS[it.icon as keyof typeof ICONS] ?? Users;
              return (
                <div key={it.title} className="rounded-card border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/[0.18]">
                    <Icon size={17} className="text-accent" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[15px] font-semibold text-white">{it.title}</p>
                  <p className="mt-1 text-[13px] leading-snug text-white/70">{it.body}</p>
                </div>
              );
            })}
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-col gap-4 rounded-card border border-accent/40 bg-accent/[0.1] p-6 md:mt-10 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-h3 text-white">{c.dataOwnership.heading}</p>
              <p className="mt-1.5 max-w-lead text-body text-white/[0.88]">{c.dataOwnership.body}</p>
            </div>
            <Database size={36} className="shrink-0 text-accent" aria-hidden="true" />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <SectionHeader eyebrow={c.pilot.eyebrow} title={c.pilot.heading} lead={c.pilot.body} />
            <Reveal delay={160} variant="surface">
              <div className="rounded-card border border-border bg-card p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-fg">
                  <span className="text-[28px] font-extrabold tracking-[-0.02em] md:text-[34px]">
                    {gbp(pilot.setup)} <span className="text-[14px] font-medium text-muted">setup</span>
                  </span>
                  <span className="text-[22px] text-muted" aria-hidden="true">
                    +
                  </span>
                  <span className="text-[28px] font-extrabold tracking-[-0.02em] md:text-[34px]">{ongoingLabel(pilot)}</span>
                  <span className="text-[22px] text-muted" aria-hidden="true">
                    =
                  </span>
                  <span className="rounded-full bg-fg px-4 py-2 text-[15px] font-bold text-bg">{pilot.name}</span>
                </div>
                <p className="mt-5 text-[15px] font-semibold text-fg">{c.pilot.commitment}</p>
                <p className="mt-2 text-body text-muted">{c.pilot.guaranteeNote}</p>
                <p className="mt-4 border-t border-border pt-4 text-[13px] text-muted">{c.pilot.terms}</p>
                <div className="mt-5">
                  <BookCallLink location="pricing-pilot" service="pricing" variant="primary" magnetic>
                    {pilot.cta}
                  </BookCallLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={c.scaling.eyebrow} title={c.scaling.heading} lead={c.scaling.body} align="center" />
          <Reveal delay={160} className="mt-10 md:mt-14">
            <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {packages.map((p, i) => (
                <li key={p.id} className={`relative rounded-card border p-5 ${p.recommended ? "border-accent/60 bg-accent/[0.06]" : "border-border bg-card"}`}>
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">
                    {i + 1} · {p.name}
                  </p>
                  <p className="mt-2 text-[24px] font-extrabold tracking-[-0.02em] text-fg">{p.monthly === null && !p.perMeeting ? c.scaling.customLabel : ongoingLabel(p)}</p>
                  <p className="mt-1 text-[13px] text-muted">{p.model === "performance" ? c.pilot.terms : c.scaling.fixedTerms}</p>
                  {i < packages.length - 1 && <ArrowRight size={18} className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-muted lg:block" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={c.proof.eyebrow} title={c.proof.heading} lead={c.proof.body} />
          <Reveal delay={160} className="mt-10 md:mt-12">
            <StatsBand heading="" items={c.proof.stats.map((s) => ({ value: s.value, label: s.label, sourceType: "verified" as const, source: c.proof.source }))} />
          </Reveal>
        </Container>
      </Section>

      <FaqSection eyebrow={c.faq.eyebrow} heading={c.faq.heading} items={c.faq.items} service="pricing" />
      <LeadCta eyebrow={c.cta.eyebrow} heading={c.cta.heading} body={c.cta.body} service="pricing" secondary={c.cta.secondary} />
    </>
  );
}
