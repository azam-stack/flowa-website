import { Section, Container } from "./Section";
import { Reveal } from "./Reveal";
import { MeetingCard } from "./MeetingCard";
import { ProspectCard } from "./ProspectCard";
import { DecorativeBlob } from "./DecorativeBlob";
import { operator, team } from "@/content/site.en";
import { demo } from "@/content/demo";
import { asset } from "@/lib/asset";

/**
 * The person behind the system. Ahmed's portrait as a cutout inside a
 * glass panel over an organic light field, with the objects of an
 * engagement floating around him: a meeting, a prospect, a fragment of a
 * conversation, a data point, joined by drawn lines. Editorial, not a
 * stock-photo employee. The photo itself is the team portrait, cut out;
 * the face is untouched.
 */
export function OperatorSection() {
  const a = team.ahmed;
  const m = demo.meeting;
  const p = demo.prospects[2];
  return (
    <Section id="operator" className="overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal stagger>
            <p className="flex items-center gap-3 text-eyebrow text-muted">
              <span className="rule h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
              {operator.eyebrow}
            </p>
            <h2 className="far mt-2 text-h2 text-fg md:mt-3">{operator.h2}</h2>
            <p className="mt-4 max-w-lead text-lead text-muted md:mt-5">{operator.body}</p>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              <div>
                <p className="text-[15px] font-semibold text-fg">{a.firstName}</p>
                <p className="text-small text-muted">{a.role}</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {a.owns.map((line) => (
                <li key={line} className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-fg">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-muted">{operator.note}</p>
          </Reveal>

          <Reveal variant="surface" threshold={0.2} className="relative mx-auto w-full max-w-[560px]">
            <div className="operator relative aspect-[4/4.2] sm:aspect-[5/4.6]">
              {/* organic light field */}
              <DecorativeBlob className="parallax parallax-slow absolute -left-[8%] top-[6%] h-[92%] w-[92%] text-accent/[0.16]" />
              <div className="absolute inset-[6%] rounded-panel" style={{ background: "var(--gradient-atmosphere)", filter: "blur(24px)" }} />
              {/* glass panel */}
              <div className="absolute inset-x-[10%] bottom-0 top-[14%] overflow-hidden rounded-panel border border-border/70 backdrop-blur-md" style={{ background: "var(--surface-glass)" }}>
                <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: "var(--gradient-highlight)" }} />
              </div>
              {/* portrait cutout, anchored to the panel's floor */}
              <picture>
                <source srcSet={asset("images/operator/ahmed-cutout.webp")} type="image/webp" />
                <img
                  src={asset("images/operator/ahmed-cutout.png")}
                  alt={`${a.firstName}, ${a.role}`}
                  width={480}
                  height={600}
                  loading="lazy"
                  className="operator-portrait absolute bottom-0 left-1/2 h-[86%] w-auto -translate-x-1/2 object-contain grayscale"
                  style={{ filter: "grayscale(1) drop-shadow(0 30px 40px rgb(12 12 11 / 0.22))" }}
                />
              </picture>
              {/* connection lines */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 78 18 C 70 26, 64 34, 58 44" className="operator-line" pathLength={1} />
                <path d="M 20 40 C 30 42, 38 48, 44 56" className="operator-line" pathLength={1} style={{ "--t": "300ms" } as React.CSSProperties} />
                <path d="M 76 74 C 70 70, 66 66, 60 62" className="operator-line" pathLength={1} style={{ "--t": "600ms" } as React.CSSProperties} />
              </svg>
              {/* floating objects */}
              <div className="parallax absolute right-0 top-[4%] w-[min(250px,52%)]">
                <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled className="!p-3 shadow-float" />
              </div>
              <div className="parallax absolute left-0 top-[36%] hidden w-[min(272px,52%)] sm:block">
                <ProspectCard name={p.name} role={p.role} company={p.company} icp={p.icp} decisionMaker status="Qualified" className="!p-3 shadow-float" />
              </div>
              <div className="absolute bottom-[8%] right-[2%] max-w-[46%] rounded-card border border-border p-3 shadow-float backdrop-blur-md" style={{ background: "var(--surface-glass-strong)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Conversation · 10:14</p>
                <p className="mt-1 text-[12px] leading-snug text-fg">“What would a trial month look like?”</p>
              </div>
              <span className="absolute left-[12%] top-[16%] rounded-full bg-fg px-2.5 py-1 text-[11px] font-semibold text-bg">Qualified · 09:30</span>
              <span className="absolute bottom-[6%] left-[14%] rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-fg">ICP 94%</span>
            </div>
            <p className="mt-3 text-center text-[12px] text-muted">{demo.label}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
