import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView } from "@/hooks/useInView";
import { Avatar } from "./Mocks";
import { Calendar, Check } from "./Icons";
import { Section } from "./SectionHeading";

/**
 * "What you get": the deliverable itself, before any explanation of how.
 * Left, the headline and the four checks every meeting passes before it
 * is invoiced. Right, the invite as it lands in the buyer's calendar:
 * slot, who, why now, the brief, and a "Held" stamp that lands once the
 * card is on screen. Fictional lead, illustrative.
 */
export function TheMeeting() {
  const m = home.meeting;
  const inv = m.invite;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35, once: true });

  return (
    <Section id="the-meeting">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow text-brand-deep">{m.eyebrow}</p>
            <h2 className="mt-3 text-h2 text-ink">
              {m.h2Light}
              <span className="font-semibold">{m.h2Bold}</span>
            </h2>
            <p className="mt-4 max-w-lead text-sub text-ink-2">{m.sub}</p>

            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{m.checksTitle}</p>
            <ol className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {m.checks.map((c, i) => (
                <li key={c.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-ink text-white">
                    <Check size={12} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-ink">
                      {i + 1}. {c.title}
                    </span>
                    <span className="mt-1 block text-[14.5px] leading-snug text-ink-2">{c.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <div ref={ref} className={`meeting-card ${inView ? "is-held" : ""}`}>
              <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-ink text-white">
                    <Calendar size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-muted">{inv.kicker}</p>
                    <p className="text-[17px] font-semibold leading-tight text-ink">{inv.title}</p>
                  </div>
                </div>
                <span className="meeting-held" aria-live="polite">
                  <Check size={12} /> {inv.held}
                </span>
              </div>

              <div className="flex flex-col gap-5 px-6 py-5">
                <div className="flex items-center gap-3">
                  <Avatar name={inv.who.name} size={44} />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink">
                      {inv.who.name} <span className="font-normal text-ink-2">· {inv.who.role}</span>
                    </p>
                    <p className="truncate text-[13px] text-muted">{inv.who.company}</p>
                  </div>
                </div>

                <div className="rounded-[14px] bg-brand/15 px-4 py-3">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-deep">{inv.whyLabel}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink">{inv.why}</p>
                </div>

                <div className="rounded-[14px] bg-soft px-4 py-3">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted">{inv.briefLabel}</p>
                  <p className="mt-1 text-[14.5px] leading-snug text-ink-2">{inv.brief}</p>
                </div>

                <p className="text-[12.5px] text-muted">{inv.bookedBy}</p>
              </div>
            </div>
            <p className="mt-5 text-[15px] text-ink-2">
              <span className="font-semibold text-ink">{inv.proof.split(". ")[0]}.</span> {inv.proof.split(". ").slice(1).join(". ")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
