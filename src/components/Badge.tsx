import type { ReactNode } from "react";
import { Check } from "lucide-react";

const VARIANTS = {
  neutral: "bg-fg/[0.06] text-fg",
  accent: "bg-accent text-accent-fg",
  dark: "bg-riskband text-white",
} as const;

/** Pill label. 12px, one of three tones; optional leading check. */
export function Badge({ variant = "neutral", check = false, className = "", children }: { variant?: keyof typeof VARIANTS; check?: boolean; className?: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold leading-none ${VARIANTS[variant]} ${className}`}>
      {check && <Check size={13} className="shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />}
      {children}
    </span>
  );
}
