/**
 * Sentence-case, normal body size — deliberately not the tracked-out
 * ALL-CAPS-plus-middle-dot eyebrow that's become a generic "AI landing
 * page" tell. See V2 brief §3.1.
 */
export function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[15px] font-medium ${dark ? "text-ink-muted" : "text-muted"}`}>{children}</p>;
}
