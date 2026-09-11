export function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${dark ? "text-ink-muted" : "text-muted"}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
