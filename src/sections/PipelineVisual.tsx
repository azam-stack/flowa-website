import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site.en";

const STEP_MS = 3000;

/** Original abstract pipeline visualization — not stock imagery. Cycles
 * through the four stages on a slow loop, pausing on hover; ends each cycle
 * with a concrete artefact (a booked-meeting card) so the diagram reads as
 * a picture of the product, not an abstract diagram. */
export function PipelineVisual() {
  const steps = hero.card.steps;
  const [activeStep, setActiveStep] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (reducedMotion.current) {
      setActiveStep(steps.length - 1);
      return;
    }
    if (hovering) return;
    const id = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), STEP_MS);
    return () => clearInterval(id);
  }, [hovering, steps.length]);

  const showMeeting = activeStep === steps.length - 1;

  return (
    <div
      className="relative overflow-hidden rounded-card border border-border bg-card p-6 shadow-float sm:p-8"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[13px] font-medium text-muted">{hero.card.label}</span>
      </div>

      <div className="relative flex flex-col gap-0">
        {steps.map((stage, i) => {
          const state = i < activeStep ? "completed" : i === activeStep ? "active" : "upcoming";
          return (
            <div key={stage} className="relative flex items-center gap-4 py-3">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                {i < steps.length - 1 && (
                  <span className="absolute left-1/2 top-8 h-[calc(100%+0.5rem)] w-px -translate-x-1/2 bg-border">
                    <span
                      className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-500 ease-out"
                      style={{ height: i < activeStep ? "100%" : "0%" }}
                    />
                  </span>
                )}
                <span
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300 ${
                    state === "active"
                      ? "border-accent bg-accent text-accent-fg"
                      : state === "completed"
                        ? "border-transparent bg-accent/[0.12] text-accent-hover"
                        : "border-border bg-bg text-muted"
                  }`}
                >
                  {i + 1}
                </span>
              </div>
              <span className={`text-[15px] font-medium transition-colors duration-300 ${state === "upcoming" ? "text-muted" : "text-fg"}`}>{stage}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: showMeeting ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="flex items-start justify-between gap-3 rounded-field border border-accent/20 bg-accent/[0.06] p-4">
            <div>
              <p className="text-sm font-bold text-fg">{hero.card.meeting.company}</p>
              <p className="mt-0.5 text-[13px] text-muted">{hero.card.meeting.role}</p>
              <p className="mt-1.5 text-[13px] font-medium text-fg/70">{hero.card.meeting.when}</p>
            </div>
            <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-fg">{hero.card.meeting.tag}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted">{hero.card.caption}</p>
    </div>
  );
}
