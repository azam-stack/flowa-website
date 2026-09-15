import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { howItWorks, chapters } from "@/content/site.en";

/**
 * Section 5 — the process as a system. Four stages on one line that is
 * drawn left-to-right when the section scrolls into view; each stage
 * carries its system name, the plain title and body, and the output it
 * hands to the next stage. Stages complete in sequence, the last one
 * confirmed. On mobile the line runs vertically down the left.
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

  const last = howItWorks.steps.length - 1;

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.h2} chapter={chapters.howItWorks} />

        <div ref={ref} data-inview={drawn ? "true" : "false"} className="relative mt-10 lg:mt-14">
          {/* Desktop connector */}
          <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px lg:block" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ width: drawn ? "100%" : "0%" }} />
          </div>
          {/* Mobile connector */}
          <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px lg:hidden" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ height: drawn ? "100%" : "0%" }} />
          </div>

          <ol className="stagger relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8" style={{ "--delay": "200ms" } as React.CSSProperties}>
            {howItWorks.steps.map((step, i) => {
              const final = i === last;
              return (
                <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4 lg:block">
                  <span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-bold transition-[background-color,border-color,color] duration-fast ease-out motion-reduce:transition-none ${
                      drawn ? (final ? "border-fg bg-fg text-bg" : "border-accent bg-accent text-accent-fg") : "border-border bg-bg text-muted"
                    }`}
                    style={{ transitionDelay: drawn ? `${300 + i * 140}ms` : "0ms" }}
                    aria-hidden="true"
                  >
                    {final && drawn ? <Check size={16} strokeWidth={3} /> : step.n}
                  </span>
                  <div className="lg:mt-6">
                    <p className="sys text-accent-band">{step.stage}</p>
                    <h3 className="mt-2 text-h3 text-fg">{step.title}</h3>
                    <p className="mt-2 text-body text-muted lg:mt-2.5">{step.body}</p>
                    <p className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-[13px] leading-snug text-fg">
                      <span className="sys mt-[3px] shrink-0 text-muted">Out</span>
                      <span>{step.output}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
