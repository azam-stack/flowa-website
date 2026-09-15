import { Section, Container } from "./Section";
import { Reveal } from "./Reveal";
import { MeetingCard } from "./MeetingCard";
import { ProspectCard } from "./ProspectCard";
import { BookCallLink } from "./BookCallLink";
import { AmbientGradient } from "./AmbientGradient";
import { operator, team } from "@/content/site.en";
import { demo } from "@/content/demo";
import { asset } from "@/lib/asset";

/**
 * The person behind the system. A dark panel, as in the reference the
 * founders supplied (manbelkins.png): the copy on the left, Ahmed's
 * cutout on the right rising out of a warm light and cropped by the
 * panel's floor. What makes it Flowa's, not a stock composition, are the
 * objects of an engagement floating around him in dark glass: a meeting,
 * a prospect, a fragment of a conversation, joined by drawn lines. The
 * photo is the team portrait, cut out; the face is untouched.
 */
export function OperatorSection() {
  const a = team.ahmed;
  const m = demo.meeting;
  const p = demo.prospects[2];
  return (
    <Section id="operator" tone="band" density="band" divider={false} className="band-depth relative overflow-hidden md:mx-4 md:rounded-panel lg:mx-6">
      <AmbientGradient />
      <Container className="relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <Reveal stagger>
            <p className="flex items-center gap-3 text-eyebrow text-white/70">
              <span className="rule h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
              {operator.eyebrow}
            </p>
            <h2 className="far mt-2 text-h2 text-white md:mt-3">{operator.h2}</h2>
            <p className="mt-4 max-w-lead text-lead text-white/[0.88] md:mt-5">{operator.body}</p>
            <div className="mt-6 md:mt-8">
              <p className="text-[15px] font-semibold text-white">{a.firstName}</p>
              <p className="text-small text-white/60">{a.role}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {a.owns.map((line) => (
                <li key={line} className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[13px] font-medium text-white">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] text-white/60">{operator.note}</p>
            <div className="mt-7 md:mt-8">
              <BookCallLink location="operator" service="appointment-setting" variant="accent" magnetic />
            </div>
          </Reveal>

          <Reveal variant="surface" threshold={0.2} className="relative -mb-[var(--band-pad,4rem)] h-[420px] sm:h-[480px] lg:h-[560px]">
            <div className="operator absolute inset-0">
              {/* the warm light the portrait rises out of */}
              <div className="absolute inset-x-[5%] bottom-[-10%] top-[10%] rounded-full" style={{ background: "radial-gradient(50% 55% at 55% 70%, rgb(var(--rgb-accent) / 0.55), rgb(var(--rgb-accent-band) / 0.25) 45%, rgb(var(--rgb-accent) / 0) 75%)", filter: "blur(28px)" }} aria-hidden="true" />
              {/* portrait cutout, cropped by the panel's floor */}
              <picture>
                <source srcSet={asset("images/operator/ahmed-cutout.webp")} type="image/webp" />
                <img
                  src={asset("images/operator/ahmed-cutout.png")}
                  alt={`${a.firstName}, ${a.role}`}
                  width={480}
                  height={600}
                  loading="lazy"
                  className="absolute bottom-[-6%] left-[58%] h-[104%] w-auto max-w-none -translate-x-1/2 object-contain grayscale"
                  style={{ filter: "grayscale(1) contrast(1.04) drop-shadow(0 30px 50px rgb(0 0 0 / 0.5))" }}
                />
              </picture>
              {/* connection lines */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 80 20 C 72 28, 66 36, 60 46" className="operator-line operator-line-dark" pathLength={1} />
                <path d="M 22 40 C 30 44, 38 50, 44 58" className="operator-line operator-line-dark" pathLength={1} style={{ "--t": "300ms" } as React.CSSProperties} />
                <path d="M 78 78 C 72 74, 68 68, 62 62" className="operator-line operator-line-dark" pathLength={1} style={{ "--t": "600ms" } as React.CSSProperties} />
              </svg>
              {/* floating objects, in dark glass */}
              <div className="parallax absolute right-0 top-[2%] w-[min(270px,64%)]">
                <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled dark className="!p-3" />
              </div>
              <div className="parallax absolute left-0 top-[30%] hidden w-[min(250px,44%)] sm:block">
                <ProspectCard name={p.name} role={p.role} company={p.company} icp={p.icp} decisionMaker status="Qualified" dark className="!p-3" />
              </div>
              <div className="absolute bottom-[10%] right-[2%] max-w-[50%] rounded-card border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">Conversation · 10:14</p>
                <p className="mt-1 text-[12px] leading-snug">“What would a trial month look like?”</p>
              </div>
              <span className="absolute left-[4%] top-[40%] rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-fg sm:left-[6%] sm:top-[12%]">Qualified · 09:30</span>
              <span className="absolute bottom-[8%] left-[8%] rounded-full border border-white/20 bg-white/[0.08] px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">ICP 94%</span>
              <span className="absolute bottom-[2%] left-1/2 -translate-x-1/2 text-[11px] text-white/50">{demo.label}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
