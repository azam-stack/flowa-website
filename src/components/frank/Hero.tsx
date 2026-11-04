import { Container } from "@/components/Container";
import { SmartLink } from "@/components/SmartLink";
import { home } from "@/content/frank/home";
import { track } from "@/lib/analytics";
import { Btn } from "./Btn";
import { KineticField } from "./KineticField";

/**
 * Homepage hero: black, a tangerine field of streaming strands behind a
 * centred two-tone headline, one paragraph, two pill actions and the
 * proof line. Nothing else competes with the headline.
 */
export function Hero() {
  const h = home.hero;
  return (
    <section className="relative overflow-hidden" aria-label="Introduction">
      <KineticField strands={220} pinch={0.6} intensity={1.45} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-page" aria-hidden="true" />
      <Container>
        <div className="relative z-[2] mx-auto max-w-[960px] px-2 pb-20 pt-24 text-center md:pb-28 md:pt-36">
          <p className="mono-label mb-6 text-brand-deep">B2B appointment setting · UK</p>
          <h1 className="tt text-h1">
            <span className="block">{h.h1Light.trim()}</span>
            <span className="dim block">{h.h1Bold}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[640px] text-[18px] leading-relaxed text-ink-2 md:text-[20px]">{h.sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Btn href={h.demoHref} size="lg" trackLabel="hero_book_call">
              {h.demo}
            </Btn>
            <SmartLink href={h.secondaryHref} className="btn btn-outline h-14 px-7 text-[16px]" onClick={() => track("cta_click", { label: "hero_see_how" })}>
              {h.secondary}
            </SmartLink>
          </div>
          <ul className="mx-auto mt-14 flex max-w-[760px] flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-line pt-7" aria-label="Flowa's own numbers">
            {h.proof.map((p) => (
              <li key={p.label} className="flex items-baseline gap-2">
                <span className="text-[26px] font-medium leading-none tracking-[-0.02em] text-ink md:text-[30px]">{p.value}</span>
                <span className="text-[14px] text-muted">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
