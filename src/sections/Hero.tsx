import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { hero } from "@/content/site.en";
import { PipelineVisual } from "./PipelineVisual";

/**
 * Section 1. One orchestrated entrance on load (eyebrow → headline → sub
 * → CTAs → artefact, 60ms apart) — the only load animation on the site.
 * The primary CTA is near-black so the two-tone headline is the single
 * orange element in the text column.
 */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[60vh] items-center overflow-hidden pb-12 pt-28 md:pb-16 md:pt-36">
      <DecorativeBlob className="pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px] text-accent/[0.05]" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <div className="enter" style={{ "--enter-delay": "0ms" } as React.CSSProperties}>
              <SectionLabel>{hero.eyebrow}</SectionLabel>
            </div>
            <h1 className="enter mt-4 text-display text-[color:var(--flowa-text)]" style={{ "--enter-delay": "60ms" } as React.CSSProperties} data-hero-h1>
              {hero.h1[0]}
              <br />
              <span className="text-accent-display">{hero.h1[1]}</span>
            </h1>
            <p className="enter mt-6 max-w-lead text-lead text-[#4A4744]" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
              {hero.sub}
            </p>
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
              <LinkButton id="hero-cta" href="#contact" variant="primary" size="lg">
                {hero.ctaPrimary}
              </LinkButton>
              <LinkButton href="#how-it-works" variant="ghost" size="lg" arrow>
                {hero.ctaSecondary}
              </LinkButton>
            </div>
            <div className="enter mt-8 flex flex-col gap-1.5 text-small text-muted" style={{ "--enter-delay": "240ms" } as React.CSSProperties}>
              <p>{hero.reassurance}</p>
              <p>{hero.foundedBy}</p>
            </div>
          </div>

          <div className="enter" style={{ "--enter-delay": "240ms" } as React.CSSProperties}>
            <PipelineVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
