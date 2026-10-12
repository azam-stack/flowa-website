import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { asset } from "@/lib/asset";
import { casesPage } from "@/content/frank/pages";
import { Btn } from "./Btn";
import { CaseCard } from "./CaseCard";
import { CountUp } from "./CountUp";
import { SectionHeading } from "./SectionHeading";
import { Section } from "./SectionHeading";

/**
 * Proof (brief §4.9): the H2 with its bold word, a framed quote card with
 * big apricot quotation marks overlapping its bottom edge, and the stat
 * stack with thin ink rules. The quote is the founder's own until a
 * client quote is approved. Stats count up once in view. Reused on
 * /frank and /cases.
 */
export function ProofBlock({ withHeading = true, withStats = true }: { withHeading?: boolean; withStats?: boolean }) {
  const p = home.proof;
  return (
    <>
      {withHeading && (
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-light text-ink">
            {p.h2Light}
            <strong className="font-semibold">{p.h2Bold}</strong>
            {p.h2Rest}
          </h2>
        </Reveal>
      )}
      <div className={`grid gap-10 ${withStats ? "md:grid-cols-2 md:gap-12 lg:gap-16" : "mx-auto max-w-3xl"} ${withHeading ? "mt-12 md:mt-16" : ""}`}>
        <Reveal className="self-start">
          <figure className="framed relative shadow-float px-7 pb-16 pt-8 md:px-10 md:pb-20 md:pt-10">
            <blockquote className="text-[22px] font-light leading-snug text-ink md:text-[26px]">“{p.quote}”</blockquote>
            <figcaption className="mt-6 text-[15px] text-ink-2">
              <span className="font-semibold text-ink">{p.quoteName}</span>, {p.quoteRole}
            </figcaption>
            {/* the big apricot marks straddle the card's bottom edge */}
            <span aria-hidden="true" className="serif pointer-events-none absolute -bottom-[0.62em] right-8 select-none text-[150px] leading-none text-brand md:-bottom-[0.6em] md:text-[190px]">
              ”
            </span>
          </figure>
        </Reveal>
        {withStats && (
        <Reveal delay={80}>
          <ul className="divide-y divide-ink border-y border-ink">
            {p.stats.map((s) => (
              <li key={s.label} className="flex items-baseline gap-5 py-5 md:py-6">
                <CountUp value={s.value} className="text-stat w-[200px] flex-none text-ink md:w-[230px]" />
                <span className="text-body text-ink-2">{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-small text-muted">{p.footnote}</p>
        </Reveal>
        )}
      </div>
    </>
  );
}

export function Proof({ withHeading = true, withStats = true }: { withHeading?: boolean; withStats?: boolean }) {
  return (
    <Section id="proof">
      <Container>
        <ProofBlock withHeading={withHeading} withStats={withStats} />
      </Container>
    </Section>
  );
}

/**
 * The numbers right under the client logos on the homepage: "Our own
 * numbers, not promises", four stats in a row with thin ink dividers,
 * counting up once in view, with their provenance underneath.
 */
export function StatsStrip({ className = "" }: { className?: string }) {
  const p = home.proof;
  return (
    <section className={className} aria-label={p.stripTitle}>
      <Container>
        <Reveal className="grid gap-6 border-y border-ink py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,3fr)] md:items-center md:gap-10 md:py-10">
          <div>
            <p className="text-[22px] font-light leading-tight text-ink md:text-[26px]">
              {p.stripTitleLight}
              <strong className="font-semibold">{p.stripTitleBold}</strong>
            </p>
            <p className="mt-2 text-small text-muted">{p.footnote}</p>
          </div>
          <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {p.stats.map((s, i) => (
              <li key={s.label} className={`min-w-0 px-0 md:px-6 ${i > 0 ? "md:border-l md:border-ink/15" : ""}`}>
                <CountUp value={s.value} className="block text-[clamp(2.25rem,1.6rem+1.6vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-ink" />
                <p className="mt-2 text-[14px] leading-snug text-ink-2">{s.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Homepage results: the two published client cases next to the founder
 * quote, with a link to /cases.
 */
export function ClientResults() {
  const p = home.proof;
  const r = home.results;
  return (
    <Section id="results">
      <Container>
        <SectionHeading eyebrow={r.eyebrow} title={r.h2} sub={r.sub} />
        <Reveal stagger className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {casesPage.cases.map((c) => (
            <CaseCard key={c.slug} c={c} compact />
          ))}
          <figure className="relative flex flex-col justify-between rounded-frame bg-ink p-6 text-white shadow-lift md:p-8">
            <blockquote className="text-[20px] font-light leading-snug md:text-[22px]">“{p.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-[14px] text-white/80">
              <img src={asset("images/team/ahmed.webp")} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover object-top" />
              <span>
                <span className="font-semibold text-white">{p.quoteName}</span>, {p.quoteRole}
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="mt-8 flex justify-center">
          <Btn href="/cases" variant="outline" trackLabel="results_all_cases">
            {r.cta}
          </Btn>
        </div>
      </Container>
    </Section>
  );
}
