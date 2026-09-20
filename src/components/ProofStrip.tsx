import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/useInView";
import { proof } from "@/content/proof";
import { statSources } from "@/content/site.en";

/**
 * The track record as one calm strip: four figures on a rule, the
 * heading beside them, the source under them.
 *
 * The figure itself never animates. A count-up rendered "0+" until the
 * observer fired, which is both a visible glitch and a number that was
 * briefly untrue; these are the founders' own results and they are
 * shown as given, from the first painted frame. The motion in this
 * section is the reveal around it, which is enough.
 */
function Figure({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  const numeric = /^\d+$/.test(value);
  const shown = numeric ? `${Number(value).toLocaleString("en-GB")}${suffix ?? ""}` : value;
  return (
    <div className="py-5 lg:py-0">
      <p className="text-[36px] font-extrabold leading-none tracking-[-0.03em] text-fg tabular-nums md:text-[44px]">{shown}</p>
      <p className="mt-2 text-small text-muted">{label}</p>
    </div>
  );
}

export function ProofStrip({ compact = false }: { compact?: boolean }) {
  const { ref } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  return (
    <section aria-label={proof.eyebrow} className={`border-t border-border ${compact ? "py-compact" : "py-section"}`}>
      <Container>
        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
          <Reveal stagger>
            <h2 className="far text-h2 text-fg">{proof.heading}</h2>
            {!compact && <p className="mt-4 max-w-lead text-body text-muted">{proof.body}</p>}
          </Reveal>
          <Reveal delay={160} variant="near">
            <dl className="grid grid-cols-2 divide-y divide-border border-y border-border lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:py-7">
              {proof.stats.map((s, i) => (
                <div key={s.label} className={`lg:px-6 ${i === 0 ? "lg:pl-0" : ""} ${i % 2 === 1 ? "pl-6 lg:pl-6" : ""}`}>
                  <Figure value={s.value} suffix={"suffix" in s ? s.suffix : undefined} label={s.label} />
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {statSources.verified} · {proof.source}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
