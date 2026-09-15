import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceDefinition } from "@/content/types";
import { servicePath } from "@/content/services";
import { useCycle } from "@/hooks/useCycle";
import { track } from "@/lib/analytics";

/**
 * A service as a miniature Flowa system: its stages on one line with a
 * light moving between them, inside a glass surface that lifts on hover.
 * The whole card is the link.
 */
export function ServiceCard({ service, promise, explore, index }: { service: ServiceDefinition; promise: string; explore: string; index: number }) {
  const stages = service.cardStages;
  const { ref, step, active } = useCycle<HTMLDivElement>(stages.length, 1300 + index * 140, { holdLastMs: 2200 });
  return (
    <Link
      to={servicePath(service.slug)}
      onClick={() => track("service_card_click", { service: service.slug })}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border shadow-subtle backdrop-blur-md transition-[transform,box-shadow,border-color] duration-slow ease-flowa hover:-translate-y-1 hover:border-fg/30 hover:shadow-float motion-reduce:transition-none"
      style={{ background: "var(--surface-glass-strong)" }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70 transition-opacity duration-slow group-hover:opacity-100" style={{ background: "radial-gradient(closest-side, rgb(var(--rgb-accent) / 0.22), rgb(var(--rgb-accent) / 0))" }} aria-hidden="true" />
      <div ref={ref} data-active={active ? "true" : "false"} className="relative p-6 md:p-7">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent-display">{service.name}</p>
        <p className="mt-2 text-h3 text-fg">{promise}</p>
        <ol className="mini-system relative mt-6 flex items-start justify-between gap-1" aria-label={`${service.name} stages`}>
          <span className="absolute left-3 right-3 top-[9px] h-px bg-border" aria-hidden="true" />
          <span className="absolute left-3 top-[9px] h-px bg-accent transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ width: `calc((100% - 1.5rem) * ${step / (stages.length - 1)})` }} aria-hidden="true" />
          {stages.map((s, i) => (
            <li key={s} className="relative flex max-w-[72px] flex-col items-center gap-2 text-center">
              <span className={`relative z-[1] h-[18px] w-[18px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-slow ease-flowa motion-reduce:transition-none ${i <= step ? "border-fg bg-fg" : "border-border bg-bg"} ${i === step ? "shadow-glow" : ""}`} aria-hidden="true" />
              <span className={`text-[9px] font-semibold uppercase leading-tight tracking-[0.05em] transition-colors duration-slow ${i <= step ? "text-fg" : "text-muted"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-body text-muted">{service.tagline}</p>
      </div>
      <div className="relative mt-auto flex items-center justify-between border-t border-border px-6 py-4 md:px-7">
        <span className="text-[14px] font-semibold text-fg">
          {explore} {service.name.toLowerCase()}
        </span>
        <ArrowRight size={16} className="text-fg transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px]" aria-hidden="true" />
      </div>
    </Link>
  );
}
