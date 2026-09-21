import { Section, SectionHeader, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BookCallLink } from "@/components/BookCallLink";
import { LinkButton } from "@/components/Button";
import { EnginePipeline } from "@/components/why/EnginePipeline";
import { whyFlowa } from "@/content/why-flowa";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { SmartLink } from "@/components/SmartLink";
import { ArrowRight } from "lucide-react";

/**
 * /why-flowa — the proof-of-engine page. One idea runs through it: the
 * AI reads the market, people start the conversations.
 *
 * Section order is deliberate and each section has exactly one job:
 * claim, problem, the engine itself, what a signal looks like, where
 * the AI stops, what the client sees, close. Nothing is said twice; if
 * a capability needs stating, it belongs in `whyFlowa.engine` and the
 * others link rather than repeat. The comparison with hiring an SDR or
 * using an agency lives on the home page and is linked, not restated.
 */
const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;
const FALLBACK = "/#contact";

export function WhyFlowaPage() {
  const c = whyFlowa;
  useSeo({
    title: c.seo.title,
    description: c.seo.description,
    path: "/why-flowa",
    ogTitle: c.seo.ogTitle,
    ogDescription: c.seo.ogDescription,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Why Flowa", path: "/why-flowa" }])],
  });

  return (
    <>
      {/* 1 — the claim */}
      <section id="top" className="atmosphere relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pt-44">
        <Container className="relative z-[2]">
          <div className="max-w-3xl">
            <h1 className="text-display text-[color:var(--flowa-text)]">
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {c.hero.h1[0]}
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line text-accent-display" style={T(210)}>
                  {c.hero.h1[1]}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
              {c.hero.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
              <div className="hero-rise" style={T(560)}>
                <BookCallLink id="hero-cta" location="why-flowa-hero" service="why-flowa" fallback={FALLBACK} size="lg" magnetic className="w-full sm:w-auto" />
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href={c.hero.ctaSecondary.href} variant="ghost" size="lg" className="w-full sm:w-auto">
                  {c.hero.ctaSecondary.label}
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — why static lists fail */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeader title={c.problem.h2} />
            <Reveal delay={120} variant="near">
              <ul className="stagger divide-y divide-border border-y border-border">
                {c.problem.lines.map((line) => (
                  <li key={line} className="py-5 text-body text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3 — the engine: every capability lives here and nowhere else */}
      <Section id="engine" className="scroll-mt-20">
        <Container>
          <SectionHeader title={c.engine.h2} lead={c.engine.lead} />
          <div className="mt-12 md:mt-16">
            <EnginePipeline />
          </div>
          <Reveal delay={120} variant="near" className="mt-12 border-t border-border pt-6 md:mt-16">
            <p className="max-w-lead text-body text-fg">{c.engine.learns}</p>
            <p className="mt-3 text-[12px] text-muted">{c.engine.illustrative}</p>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — what a signal looks like */}
      <Section>
        <Container>
          <SectionHeader title={c.signals.h2} lead={c.signals.lead} />
          <Reveal delay={120} variant="near" stagger className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
            {c.signals.items.map((item) => (
              <article key={item.signal} className="flex flex-col gap-4 rounded-card border border-border bg-card p-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted">{c.signals.signalLabel}</p>
                  <p className="mt-2 text-[17px] font-semibold leading-snug text-fg">{item.signal}</p>
                </div>
                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-text">{c.signals.meaningLabel}</p>
                  <p className="mt-2 text-body text-muted">{item.meaning}</p>
                </div>
              </article>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-5">
            <p className="text-[12px] text-muted">{c.signals.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* 5 — the only place human approval, opt-outs and channels are stated */}
      <Section tone="band" density="band" divider={false} className="band-depth md:mx-4 md:rounded-panel lg:mx-6">
        <Container>
          <SectionHeader title={c.humanLayer.h2} lead={c.humanLayer.lead} tone="band" />
          <Reveal delay={120} variant="near" stagger className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 md:mt-12 md:grid-cols-2">
            {c.humanLayer.points.map((point) => (
              <div key={point.title}>
                <h3 className="text-h3 text-white">{point.title}</h3>
                <p className="mt-2 text-body text-white/[0.78]">{point.body}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-10 border-t border-white/15 pt-6 md:mt-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">{c.humanLayer.channelsHeading}</p>
            <p className="mt-2 max-w-lead text-body text-white/[0.88]">{c.humanLayer.channels}</p>
          </Reveal>
        </Container>
      </Section>

      {/* 6 — transparency: one lead, as the client sees it */}
      <Section>
        <Container>
          <SectionHeader title={c.dashboard.h2} lead={c.dashboard.lead} />
          <Reveal delay={120} variant="surface" className="mt-10 overflow-hidden rounded-card border border-border md:mt-12">
            <div className="hidden bg-riskband px-6 py-3.5 md:grid md:grid-cols-[1.4fr_1fr_1.1fr_0.8fr_0.7fr_1.1fr] md:gap-4">
              {c.dashboard.columns.map((col) => (
                <p key={col} className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/70">
                  {col}
                </p>
              ))}
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 bg-card p-6 md:grid-cols-[1.4fr_1fr_1.1fr_0.8fr_0.7fr_1.1fr] md:items-center md:gap-4 md:py-5">
              {[
                { label: c.dashboard.columns[0], value: c.dashboard.row.lead, strong: true },
                { label: c.dashboard.columns[1], value: c.dashboard.row.signal },
                { label: c.dashboard.columns[2], value: c.dashboard.row.segment },
                { label: c.dashboard.columns[3], value: c.dashboard.row.status, badge: true },
                { label: c.dashboard.columns[4], value: c.dashboard.row.channel },
                { label: c.dashboard.columns[5], value: c.dashboard.row.next },
              ].map((cell) => (
                <div key={cell.label} className="contents">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted md:hidden">{cell.label}</dt>
                  <dd className={`min-w-0 text-[14px] ${cell.strong ? "font-semibold text-fg" : "text-muted"}`}>
                    {cell.badge ? (
                      <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[12px] font-semibold text-accent-fg">{cell.value}</span>
                    ) : (
                      cell.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={200} className="mt-5">
            <p className="text-[12px] text-muted">{c.dashboard.note}</p>
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:gap-8">
            {c.dashboard.links.map((l) => (
              <SmartLink key={l.href} href={l.href} className="group inline-flex items-center gap-1.5 text-small font-semibold text-fg">
                {l.label}
                <ArrowRight size={14} className="transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px]" aria-hidden="true" />
              </SmartLink>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* 7 — close, on the site motto */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center" stagger>
            <h2 className="text-h2 text-fg">
              <span className="block">{c.cta.motto[0]}</span>
              <span className="block text-accent-display">{c.cta.motto[1]}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lead text-lead text-muted">{c.cta.body}</p>
            <div className="mt-8 flex justify-center">
              <BookCallLink location="why-flowa-cta" service="why-flowa" fallback={FALLBACK} size="lg" magnetic className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
