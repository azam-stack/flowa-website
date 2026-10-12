import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * H2 section title: 48px weight 500, centred, with a 20px eyebrow
 * (weight 400) above and a 20px weight-300 subline below (brief §2.3).
 */
export function SectionHeading({ eyebrow, title, sub, align = "center", className = "", children }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; align?: "center" | "left"; className?: string; children?: ReactNode }) {
  const centred = align === "center";
  return (
    <Reveal stagger className={`relative ${centred ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className="text-eyebrow text-brand-deep">{eyebrow}</p>}
      <h2 className={`text-h2 text-ink ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 text-sub text-ink-2 ${centred ? "mx-auto" : ""} max-w-lead`}>{sub}</p>}
      {children}
    </Reveal>
  );
}

/** A section's vertical rhythm: 120px desktop, 72px mobile. */
export function Section({ id, className = "", children, tone = "page", ariaLabel }: { id?: string; className?: string; children: ReactNode; tone?: "page" | "white" | "soft"; ariaLabel?: string }) {
  const bg = tone === "white" ? "bg-surface" : tone === "soft" ? "bg-soft" : "";
  return (
    <section id={id} aria-label={ariaLabel} className={`py-section-m lg:py-section ${bg} ${className}`}>
      {children}
    </section>
  );
}
