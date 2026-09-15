import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { FluidObject } from "@/components/FluidObject";
import { hero } from "@/content/site.en";

/**
 * The brand statement, with room around it, and one visual: the Flowa
 * light-form, with a single quiet card resting on it — one qualified
 * meeting, the thing the whole page is about. Entrance: the form comes
 * into focus, the headline rises out of its masks, the rest follows.
 */
const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const m = hero.card.meeting;
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-eyebrow text-muted">
              <span className="hero-rule h-px w-6 shrink-0 bg-accent" style={T(0)} aria-hidden="true" />
              <span className="hero-rise" style={T(40)}>
                {hero.eyebrow}
              </span>
            </p>
            <h1 className="mt-6 text-display text-[color:var(--flowa-text)]" data-hero-h1>
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
            <p className="hero-blur mt-7 max-w-lead text-lead text-[#4A4744] md:mt-8" style={T(420)}>
              {hero.sub}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11">
              <div className="hero-rise" style={T(560)}>
                <LinkButton id="hero-cta" href="#contact" variant="primary" size="lg" arrow magnetic className="w-full sm:w-auto">
                  {hero.ctaPrimary}
                </LinkButton>
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href="#how-it-works" variant="ghost" size="lg" className="w-full sm:w-auto">
                  {hero.ctaSecondary}
                </LinkButton>
              </div>
            </div>
            <p className="hero-rise mt-8 text-small text-muted md:mt-10" style={T(740)}>
              {hero.reassurance}
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px] lg:max-w-none">
            <div className="hero-blur absolute -inset-[14%]" style={T(0)}>
              <FluidObject className="parallax parallax-slow h-full w-full" />
            </div>
            <div className="hero-surface absolute bottom-[8%] left-0 w-[min(300px,82%)] rounded-card border border-border bg-card/[0.94] p-5 shadow-float backdrop-blur-md sm:p-6" style={T(700)}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-medium text-muted">{hero.card.label}</span>
                <Badge variant="accent">{m.tag}</Badge>
              </div>
              <p className="mt-4 text-[15px] font-semibold leading-snug text-fg">{m.company}</p>
              <p className="mt-1 text-[13px] text-muted">{m.role}</p>
              <p className="mt-3 text-[13px] font-medium text-fg/70">{m.when}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
