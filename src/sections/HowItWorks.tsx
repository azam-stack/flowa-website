import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { howItWorks } from "@/content/site.en";

/**
 * The process, as simply as it can be said: four numbered steps on one
 * line that draws itself when the section scrolls into view. On mobile
 * the line runs vertically down the left.
 */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.h2} />

        <div ref={ref} data-inview={drawn ? "true" : "false"} className="relative mt-12 lg:mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px lg:block" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ width: drawn ? "100%" : "0%" }} />
          </div>
          <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px lg:hidden" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ height: drawn ? "100%" : "0%" }} />
          </div>

          <ol className="stagger relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10" style={{ "--delay": "200ms" } as React.CSSProperties}>
            {howItWorks.steps.map((step, i) => (
              <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4 lg:block">
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-bold transition-[background-color,border-color,color] duration-fast ease-out motion-reduce:transition-none ${
                    drawn ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-muted"
                  }`}
                  style={{ transitionDelay: drawn ? `${300 + i * 140}ms` : "0ms" }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div className="lg:mt-7">
                  <h3 className="text-h3 text-fg">{step.title}</h3>
                  <p className="mt-2.5 max-w-xs text-body text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
