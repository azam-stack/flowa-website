import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type Tone = "light" | "band";
type Density = "standard" | "band" | "compact";

const PADDING: Record<Density, string> = {
  standard: "py-section",
  band: "py-band",
  compact: "py-compact",
};

/**
 * Every top-level section goes through here so vertical rhythm, tone and
 * the divider are decided once. `density` is the only spacing knob a
 * section gets.
 */
export function Section({
  id,
  tone = "light",
  density = "standard",
  divider = true,
  className = "",
  children,
  ariaLabel,
}: {
  id?: string;
  tone?: Tone;
  density?: Density;
  divider?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const toneCls = tone === "band" ? "bg-riskband text-white" : "";
  const dividerCls = divider && tone === "light" ? "border-t border-border" : "";
  return (
    <section id={id} aria-label={ariaLabel} className={`${PADDING[density]} ${toneCls} ${dividerCls} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Eyebrow (with a short rule that draws in) + heading + optional lead.
 * One style for every section — sentence case, never tracked-out caps.
 * Arrives in three beats: rule and eyebrow, then the heading from a
 * little further back, then the lead.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "band";
  return (
    <Reveal variant="near" stagger className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className={`flex items-center gap-3 text-eyebrow ${dark ? "text-ink-muted" : "text-muted"} ${align === "center" ? "justify-center" : ""}`}>
        <span className="rule h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={`far mt-2 text-h2 md:mt-3 ${dark ? "text-white" : "text-fg"}`}>{title}</h2>
      {lead && <p className={`mt-4 max-w-lead text-lead md:mt-5 ${dark ? "text-white/[0.88]" : "text-muted"} ${align === "center" ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

export { Container };
