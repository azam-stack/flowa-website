import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/content/site.en";

// Card centres as % of row width for 4 equal columns, and the arc each
// connects — alternating above/below the row per the restructure brief.
const ARCS = [
  { from: 12.5, to: 37.5, bow: -1 }, // 01 → 02, above
  { from: 37.5, to: 62.5, bow: 1 }, // 02 → 03, below
  { from: 62.5, to: 87.5, bow: -1 }, // 03 → 04, above
];

function ArcLayer({ drawn }: { drawn: boolean }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [lengths, setLengths] = useState<number[]>([]);

  useEffect(() => {
    setLengths(pathRefs.current.map((p) => p?.getTotalLength() ?? 300));
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[120px] w-full -translate-y-1/2 lg:block"
      viewBox="0 -20 100 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {ARCS.map((arc, i) => {
        const midY = 20 + arc.bow * 35;
        const len = lengths[i] ?? 300;
        return (
          <path
            key={i}
            ref={(el) => (pathRefs.current[i] = el)}
            d={`M ${arc.from} 20 Q ${(arc.from + arc.to) / 2} ${midY} ${arc.to} 20`}
            stroke="#EE9E47"
            strokeWidth={0.6}
            strokeDasharray="2 2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: len,
              strokeDashoffset: drawn ? 0 : len,
              transition: `stroke-dashoffset 700ms ease-out ${i * 200}ms`,
            }}
            className="motion-reduce:!transition-none"
          />
        );
      })}
    </svg>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
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
    <section id="how-it-works" className="border-t border-border py-12 md:py-14">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-accent-display" aria-hidden="true" />
            <p className="text-[15px] font-medium text-accent-display">{howItWorks.eyebrow}</p>
          </div>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{howItWorks.h2}</h2>
        </Reveal>

        <div ref={ref} className="relative mt-8">
          <ArcLayer drawn={drawn} />

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-5">
            {howItWorks.steps.map((step, i) => (
              <div key={step.n} className="relative">
                {i > 0 && (
                  <div className="mb-6 flex justify-center lg:hidden" aria-hidden="true">
                    <span className="h-6 w-px border-l-2 border-dashed border-accent" />
                  </div>
                )}
                <Reveal delay={i * 60}>
                  <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6">
                    <span className="pointer-events-none absolute left-6 top-4 text-[clamp(3rem,4vw,4.5rem)] font-extrabold leading-none text-accent/[0.15]" aria-hidden="true">
                      {step.n}
                    </span>
                    <h3 className="relative mt-12 text-lg font-bold tracking-tight text-fg">{step.title}</h3>
                    <p className="relative mt-2.5 text-[14px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
