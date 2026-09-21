import { Check, Linkedin, Mail, Building2 } from "lucide-react";
import { ProspectCard } from "./ProspectCard";
import { MeetingCard } from "./MeetingCard";
import { useCycle } from "@/hooks/useCycle";
import { demo } from "@/content/demo";

/**
 * The appointment-setting hero: an opportunity moving through seven
 * states, each one transforming into the next. A spine of stages on the
 * left with a light travelling down it; on the right, the object the
 * stage produces (criteria, a company, a person, a conversation, the
 * qualification, the meeting, the opportunity), crossfading in place.
 * Demo data, labelled illustrative by the hero.
 */
const STAGES = ["Target", "Company", "Decision-maker", "Conversation", "Qualified", "Meeting", "Opportunity"] as const;
const TIMES = ["Mon 09:00", "Mon 11:20", "Tue 10:14", "Tue 10:31", "Tue 10:52", "Thu 09:30", "Thu 10:15"] as const;

export function PipelineVisual() {
  const { ref, step, reduced } = useCycle<HTMLDivElement>(STAGES.length, 2100, { holdLastMs: 3200 });
  const p = demo.prospects[1];
  const m = demo.meeting;
  const settled = (i: number) => step === i;

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/4.4]" aria-hidden="true">
      <div className="absolute inset-0 rounded-panel" style={{ background: "var(--gradient-atmosphere)" }} />
      <div className="absolute inset-0 grid grid-cols-[112px_1fr] gap-4 p-3 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-5">
        {/* spine */}
        <ol className="relative flex flex-col justify-between py-2">
          <span className="absolute bottom-4 left-[11px] top-4 w-px bg-border" />
          <span className="absolute left-[11px] top-4 w-px bg-accent transition-[height] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ height: `calc((100% - 2rem) * ${step / (STAGES.length - 1)})` }} />
          {STAGES.map((s, i) => {
            const lit = i <= step;
            return (
              <li key={s} className="relative flex items-center gap-2.5">
                <span className={`relative z-[1] flex h-6 w-6 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-slow ease-flowa motion-reduce:transition-none ${lit ? "border-fg bg-fg" : "border-border bg-bg"} ${step === i ? "shadow-glow" : ""}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${lit ? "bg-accent" : "bg-border"}`} />
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.1em] transition-colors duration-slow sm:text-[11px] ${lit ? "text-fg" : "text-muted"}`}>{s}</span>
              </li>
            );
          })}
        </ol>

        {/* the object at this stage */}
        <div className="relative">
          <Stage show={settled(0)}>
            <Panel label="ICP criteria" time={TIMES[0]}>
              <ul className="flex flex-wrap gap-1.5">
                {["Logistics", "100–500 people", "Nordics", "Head of Sales", "Outbound in-house"].map((c) => (
                  <li key={c} className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-[12px] font-medium text-fg">
                    {c}
                  </li>
                ))}
              </ul>
            </Panel>
          </Stage>
          <Stage show={settled(1)}>
            <Panel label="Company match" time={TIMES[1]}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-field bg-fg/[0.06]">
                  <Building2 size={16} className="text-fg" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-fg">{p.company}</p>
                  <p className="text-[12px] text-muted">
                    {p.industry} · {p.location} · 180 people
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/[0.14] px-2 py-0.5 text-[11px] font-semibold text-accent-text">ICP {p.icp}%</p>
                </div>
              </div>
            </Panel>
          </Stage>
          <Stage show={settled(2)}>
            <ProspectCard name={p.name} role={p.role} company={p.company} industry={p.industry} location={p.location} icp={p.icp} decisionMaker active />
          </Stage>
          <Stage show={settled(3)}>
            <Panel label="Conversation" time={TIMES[3]}>
              <ul className="flex flex-col gap-2 text-[12px]">
                <li className="flex items-center gap-2 text-muted">
                  <Mail size={12} /> Email 1 sent · Mon 09:10
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Linkedin size={12} /> LinkedIn · Wed 10:14
                </li>
                <li className="rounded-field bg-fg/[0.04] p-2.5 text-fg">“We have one SDR covering three markets. What would a trial month look like?”</li>
              </ul>
            </Panel>
          </Stage>
          <Stage show={settled(4)}>
            <Panel label="Qualification" time={TIMES[4]}>
              <ul className="flex flex-col gap-2">
                {["Fits the ICP", "Decision-maker", "Relevant problem", "Genuine interest", "Meeting agreed"].map((c, k) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-fg">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform duration-slow ease-flowa ${step === 4 && !reduced ? "scale-100" : "scale-100"}`} style={{ transitionDelay: `${k * 120}ms` }}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Panel>
          </Stage>
          <Stage show={settled(5)}>
            <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled />
          </Stage>
          <Stage show={settled(6)}>
            <Panel label="Opportunity" time={TIMES[6]}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[14px] font-semibold text-fg">{p.company}</p>
                  <p className="text-[12px] text-muted">Discovery held · proposal requested</p>
                </div>
                <span className="rounded-full bg-fg px-2.5 py-1 text-[11px] font-semibold text-bg">In your pipeline</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/[0.06]">
                <div className="h-full w-[38%] rounded-full bg-accent" />
              </div>
            </Panel>
          </Stage>
          {/* particles: three points drifting between the spine and the object */}
          {!reduced && (
            <span className="pointer-events-none absolute -left-4 top-1/2 hidden sm:block">
              {[0, 1, 2].map((k) => (
                <span key={k} className="particle absolute h-1.5 w-1.5 rounded-full bg-accent/70" style={{ animationDelay: `${k * 1.1}s` }} />
              ))}
            </span>
          )}
        </div>
      </div>
      <p className="absolute bottom-3 right-4 text-[11px] text-muted sm:bottom-4 sm:right-5">
        {STAGES[step]} · {TIMES[step]} · {demo.label}
      </p>
    </div>
  );
}

function Stage({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-[opacity,transform,filter] duration-slow ease-flowa motion-reduce:transition-none ${show ? "translate-y-[-50%] scale-100 opacity-100 blur-0" : "pointer-events-none translate-y-[calc(-50%+12px)] scale-[0.97] opacity-0 blur-[2px]"}`} aria-hidden={!show}>
      {children}
    </div>
  );
}

function Panel({ label, time, children }: { label: string; time: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-border p-4 shadow-float backdrop-blur-md" style={{ background: "var(--surface-glass-strong)" }}>
      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
        <span>{label}</span>
        <span className="normal-case tracking-normal">{time}</span>
      </div>
      {children}
    </div>
  );
}
