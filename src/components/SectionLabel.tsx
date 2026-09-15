/**
 * Sentence-case, body-size eyebrow — one style for every section. Not the
 * tracked-out ALL-CAPS-plus-middle-dot eyebrow that reads as generic
 * "AI landing page" chrome, and not an orange-with-a-rule variant either.
 */
export function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-eyebrow ${dark ? "text-ink-muted" : "text-muted"}`}>{children}</p>;
}
