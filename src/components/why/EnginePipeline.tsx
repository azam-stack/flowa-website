import { Check, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { whyFlowa } from "@/content/why-flowa";

/**
 * The engine as one running system: six steps on a spine that draws
 * itself, marches a dash and sends a point of light down it, in the same
 * visual language as the process line on the service pages. Each step
 * carries a small stylised interface of the thing that step produces, so
 * the system reads as real rather than described. A dashed arc links the
 * step to its interface from lg up.
 *
 * Everything is CSS-driven off two data attributes on the list, so the
 * whole thing costs one IntersectionObserver and no animation frames.
 * Under prefers-reduced-motion the line is simply drawn and still.
 */
type Step = (typeof whyFlowa.engine.steps)[number];
type Ui = Step["ui"];

const CARD = "rounded-card border border-border bg-card p-3.5 text-[12px] leading-tight shadow-subtle";
const LABEL = "text-[10px] font-bold uppercase tracking-[0.1em] text-muted";

function StepUI({ ui }: { ui: Ui }) {
  if (ui.kind === "signal") {
    return (
      <div className={CARD}>
        <p className={LABEL}>{ui.label}</p>
        <ul className="mt-2 flex flex-col gap-1">
          {ui.lines.map((line, i) => (
            <li key={line} className={i === 0 ? "font-semibold text-fg" : "text-muted"}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (ui.kind === "verdict") {
    return (
      <div className={CARD}>
        <p className={LABEL}>{ui.label}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-fg">
            <Check size={11} strokeWidth={3} aria-hidden="true" />
            {ui.pass}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/[0.05] px-2.5 py-1 text-muted line-through">
            <X size={11} strokeWidth={3} aria-hidden="true" />
            {ui.fail}
          </span>
        </div>
      </div>
    );
  }

  if (ui.kind === "trace") {
    return (
      <div className={CARD}>
        <p className={LABEL}>{ui.label}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-fg/[0.05] px-2.5 py-1 text-muted">{ui.from}</span>
          <span className="h-px w-4 shrink-0 bg-border" aria-hidden="true" />
          <span className="rounded-full bg-fg px-2.5 py-1 font-semibold text-bg">{ui.to}</span>
        </div>
      </div>
    );
  }

  if (ui.kind === "checks") {
    return (
      <div className={CARD}>
        <p className={LABEL}>{ui.label}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {ui.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-fg">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                <Check size={10} strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (ui.kind === "score") {
    return (
      <div className={CARD}>
        <div className="flex items-center justify-between gap-3">
          <p className={LABEL}>{ui.label}</p>
          <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-fg">{ui.value}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ui.chips.map((chip) => (
            <span key={chip} className="rounded-full bg-fg/[0.05] px-2.5 py-1 text-muted">
              {chip}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={CARD}>
      <p className={LABEL}>{ui.label}</p>
      <ul className="mt-2 flex flex-col gap-1 text-fg">
        {ui.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export function EnginePipeline() {
  const { ref, inView, active } = useInView<HTMLOListElement>({ threshold: 0.12 });
  const e = whyFlowa.engine;
  return (
    <ol
      ref={ref}
      data-inview={inView ? "true" : "false"}
      data-active={active ? "true" : "false"}
      className="why-engine relative flex flex-col gap-10 md:gap-12"
    >
      <div className="pointer-events-none absolute bottom-6 left-5 top-6 w-px" aria-hidden="true">
        <div className="h-full bg-border" />
        <div className="why-engine-fill absolute inset-x-0 top-0 bg-accent" />
        <div className="why-engine-dash absolute inset-0" />
        <span className="why-engine-dot absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-accent" />
      </div>

      {e.steps.map((step, i) => (
        <li
          key={step.n}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-4 lg:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,19rem)] lg:gap-x-10"
        >
          <span
            className="why-engine-node relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-[13px] font-bold tabular-nums text-muted"
            style={{ "--i": i } as React.CSSProperties}
            aria-hidden="true"
          >
            {step.n}
          </span>

          <div className="min-w-0 lg:pt-1">
            <h3 className="text-h3 text-fg">{step.title}</h3>
            <p className="mt-2 max-w-[46ch] text-body text-muted">{step.body}</p>
          </div>

          <div className="relative col-start-2 min-w-0 lg:col-start-3 lg:row-start-1 lg:pt-1" aria-hidden="true">
            <svg className="absolute -left-9 top-5 hidden h-10 w-9 overflow-visible lg:block" viewBox="0 0 36 40" fill="none">
              <path className="why-engine-arc" d="M0 4 C18 4 18 22 36 22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" strokeLinecap="round" />
            </svg>
            <StepUI ui={step.ui} />
          </div>
        </li>
      ))}
    </ol>
  );
}
