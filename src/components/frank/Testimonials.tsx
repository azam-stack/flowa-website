import { useState } from "react";
import { Container } from "@/components/Container";
import { home } from "@/content/frank/home";
import { ArrowLeft, ArrowRight } from "./Icons";
import { Section } from "./SectionHeading";

/**
 * Testimonial carousel (brief §4.11): built, and hidden behind
 * `home.testimonials.enabled` until Flowa supplies approved quotes
 * It renders nothing while the flag is off or the list is
 * empty, so no invented review can ever appear.
 */
export function Testimonials() {
  const t = home.testimonials;
  const [index, setIndex] = useState(0);
  if (!t.enabled || t.items.length === 0) return null;
  const n = t.items.length;
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  return (
    <Section tone="white" ariaLabel={t.title}>
      <Container>
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-h2 text-ink">{t.title}</h2>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white hover:bg-black">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t.next} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white hover:bg-black">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="mt-10 overflow-hidden">
          <ul className="flex gap-6 transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(calc(-${index} * (100% + 1.5rem) / 3))` }}>
            {t.items.map((q) => (
              <li key={q.name + q.company} className="w-full flex-none rounded-card border border-ink bg-white p-7 md:w-[calc((100%-3rem)/3)]">
                <blockquote className="text-[17px] leading-relaxed text-ink">“{q.quote}”</blockquote>
                <p className="mt-5 text-[14px] text-ink-2">
                  <span className="font-semibold text-ink">{q.name}</span>, {q.role}, {q.company}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
