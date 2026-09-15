import type { HTMLAttributes, ReactNode } from "react";

/**
 * A card is one bounded object: the form, the hero artefact, the quote
 * box. Lists of points are set as text, not cards. Radius 20, one border
 * token, no shadow unless `floating` (the artefact) — shadows mean
 * "sits above the page", which almost nothing does.
 */
export function Card({ floating = false, dark = false, className = "", children, ...rest }: { floating?: boolean; dark?: boolean; className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const surface = dark ? "border-fg bg-fg text-bg" : "border-border bg-card text-fg";
  return (
    <div className={`rounded-card border ${surface} ${floating ? "shadow-float" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}
