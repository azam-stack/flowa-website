import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { hero } from "@/content/site.en";
import { PipelineVisual } from "./PipelineVisual";

/**
 * Section 1. The one load sequence on the site (index.css → Hero):
 *   0 ms   eyebrow rule draws, eyebrow text rises
 *   120    headline line 1 rises out of its mask
 *   210    headline line 2
 *   420    lead sharpens from blur
 *   560    primary CTA rises · 620 secondary
 *   740    reassurance
 *   320    the artefact settles in from further back, in parallel
 * Everything lands by ~1.4 s. The primary CTA is near-black so the
 * two-tone headline is the single orange element in the text column.
 */
const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[60vh] items-center overflow-hidden pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="parallax parallax-slow pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px]" aria-hidden="true">
        <DecorativeBlob className="drift h-full w-full text-accent/[0.05]" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-eyebrow text-muted">
              <span className="hero-rule h-px w-6 shrink-0 bg-accent" style={T(0)} aria-hidden="true" />
              <span className="hero-rise" style={T(40)}>
                {hero.eyebrow}
              </span>
            </p>
            <h1 className="mt-4 text-display text-[color:var(--flowa-text)]" data-hero-h1>
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {hero.h1[0]}
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line text-accent-display" style={T(210)}>
                  {hero.h1[1]}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-5 max-w-lead text-lead text-[#4A4744] md:mt-6" style={T(420)}>
              {hero.sub}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-9">
              <div className="hero-rise" style={T(560)}>
                <LinkButton id="hero-cta" href="#contact" variant="primary" size="lg" magnetic className="w-full sm:w-auto">
                  {hero.ctaPrimary}
                </LinkButton>
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href="#how-it-works" variant="ghost" size="lg" arrow className="w-full sm:w-auto">
                  {hero.ctaSecondary}
                </LinkButton>
              </div>
            </div>
            <div className="hero-rise mt-6 flex flex-col gap-1.5 text-small text-muted md:mt-8" style={T(740)}>
              <p>{hero.reassurance}</p>
              <p>{hero.foundedBy}</p>
            </div>
          </div>

          <div className="hero-surface" style={T(320)}>
            <PipelineVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
