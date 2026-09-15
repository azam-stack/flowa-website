import type { ProcessStep } from "@/content/types";
import { useInView } from "@/hooks/useInView";

/**
 * Five steps as one continuous system: the line that connects them is
 * drawn as the section arrives and then keeps moving (a marching dash
 * and a travelling point of light), so the process reads as running,
 * not listed. Vertical on small screens, horizontal from lg.
 */
export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const { ref, inView, active } = useInView<HTMLOListElement>({ threshold: 0.2 });
  const n = steps.length;
  const edge = `calc(100% / ${n} / 2)`;
  return (
    <ol ref={ref} data-inview={inView ? "true" : "false"} data-active={active ? "true" : "false"} className="process relative grid grid-cols-1 gap-8 lg:gap-6" style={{ "--n": n } as React.CSSProperties}>
      <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px lg:hidden" aria-hidden="true">
        <div className="h-full bg-border" />
        <div className="process-fill-v absolute inset-x-0 top-0 bg-accent" />
      </div>
      <div className="pointer-events-none absolute top-5 hidden h-px lg:block" style={{ left: edge, right: edge }} aria-hidden="true">
        <div className="h-full bg-border" />
        <div className="process-fill absolute inset-y-0 left-0 bg-accent" />
        <div className="process-dash absolute inset-0" />
        <span className="process-dot absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-accent" />
      </div>
      {steps.map((s, i) => (
        <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4 lg:block">
          <span className="process-node relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-[13px] font-bold text-muted lg:mx-auto" style={{ "--i": i } as React.CSSProperties} aria-hidden="true">
            {s.n}
          </span>
          <div className="lg:mt-6 lg:text-center">
            <h3 className="text-h3 text-fg">{s.title}</h3>
            <p className="mt-2 text-body text-muted lg:mx-auto lg:max-w-[26ch]">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
