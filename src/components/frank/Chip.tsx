import type { ReactNode } from "react";

/** Orange 999px chip with ink text (never white on orange). `tone="light"` is the white chip on dark mock-ups. */
export function Chip({ children, tone = "brand", className = "" }: { children: ReactNode; tone?: "brand" | "light" | "line"; className?: string }) {
  const cls = tone === "brand" ? "bg-brand text-white" : tone === "light" ? "bg-surface text-ink" : "border border-line bg-surface text-ink-2";
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-3 py-1 text-[13px] font-medium ${cls} ${className}`}>{children}</span>;
}
