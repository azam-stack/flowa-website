import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, X, Radar, Mail, RefreshCw, Users, ShieldCheck, Phone, Lock, CalendarDays, Globe, Target, CalendarClock, CalendarCheck, Settings, Repeat, Info, ChevronDown } from "lucide-react";
import { packages, pricingFeatures, pricingPage, ongoingLabel, setupLabel, type Package, type PackageId } from "@/content/pricing";
import { BookCallLink } from "../BookCallLink";

/**
 * The package comparison, rebuilt from the founders' reference table
 * (belkinstabel.png) as real, data-driven UI: plan cards as the table
 * header, a badge on the recommended column, icon-led feature rows,
 * ticks and crosses with spoken text, a footnote. Reads only from
 * src/content/pricing.ts.
 *
 * From lg: a semantic <table> with <th scope> on both axes. Below lg:
 * one card per package with the full feature list behind a disclosure,
 * so the feature name is always beside its tick.
 */
const ICONS: Record<string, typeof Check> = {
  radar: Radar,
  mail: Mail,
  refresh: RefreshCw,
  users: Users,
  shield: ShieldCheck,
  phone: Phone,
  lock: Lock,
  calendar: CalendarDays,
  globe: Globe,
  target: Target,
  "calendar-clock": CalendarClock,
  "calendar-check": CalendarCheck,
  settings: Settings,
  repeat: Repeat,
};

const t = pricingPage.table;

function Mark({ on, dark = false }: { on: boolean; dark?: boolean }) {
  return on ? (
    <span className="inline-flex items-center justify-center">
      <Check size={18} strokeWidth={2.5} className="text-accent-display" aria-hidden="true" />
      <span className="sr-only">{t.included}</span>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center">
      <X size={16} strokeWidth={2} className={dark ? "text-white/40" : "text-fg/30"} aria-hidden="true" />
      <span className="sr-only">{t.notIncluded}</span>
    </span>
  );
}

/** A note that opens on click, tap or keyboard (Enter/Space), closes on Escape and outside click. Never hover-only. */
function InfoTip({ label, note }: { label: string; note: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t.tipLabel} ${label}`}
        onClick={() => setOpen((v) => !v)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg focus-visible:bg-fg/[0.06]"
      >
        <Info size={14} aria-hidden="true" />
      </button>
      <span
        id={id}
        role="note"
        hidden={!open}
        className="absolute left-0 top-full z-20 mt-2 w-[260px] rounded-field border border-border bg-card p-3 text-left text-[12px] font-normal leading-snug text-fg shadow-float"
      >
        {note}
      </span>
    </span>
  );
}

function FeatureLabel({ name, icon, note }: { name: string; icon: string; note?: string }) {
  const Icon = ICONS[icon] ?? Check;
  return (
    <span className="inline-flex items-center gap-2.5">
      <Icon size={16} className="shrink-0 text-fg" aria-hidden="true" />
      <span className="text-[14px] font-medium text-fg">{name}</span>
      {note && <InfoTip label={name} note={note} />}
    </span>
  );
}

function PlanCard({ p, compact = false }: { p: Package; compact?: boolean }) {
  const rec = !!p.recommended;
  return (
    <div className={`flex h-full flex-col ${compact ? "" : "p-5 xl:p-6"}`}>
      <p className={`text-[12px] font-bold uppercase tracking-[0.12em] ${rec ? "text-accent-display" : "text-muted"}`}>{t.modelLabel[p.model]}</p>
      <p className="mt-2 text-[24px] font-extrabold leading-none tracking-[-0.02em] text-fg">{p.name}</p>
      <p className="mt-2 text-[14px] leading-snug text-muted">{p.positioning}</p>
      <p className="mt-4 whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.02em] text-fg xl:text-[26px]">{ongoingLabel(p)}</p>
      <p className="mt-1.5 text-[13px] text-muted">
        {p.setup > 0 ? `${setupLabel(p)} setup` : "No setup fee"} · {p.meetingsPerYear} meetings / year
      </p>
      <p className="mt-3 text-[13px] font-semibold text-fg">{p.bestFor}</p>
      <div className="mt-5">
        <BookCallLink location={`pricing-table-${p.id}`} service="pricing" variant={rec ? "accent" : "ghost"} size="sm" className="w-full">
          {p.cta}
        </BookCallLink>
      </div>
    </div>
  );
}

function Badge({ p }: { p: Package }) {
  if (!p.badge) return null;
  const rec = !!p.recommended;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${rec ? "bg-accent text-fg" : "border border-border bg-bg text-fg"}`}>
      {p.badge}
    </span>
  );
}

/* ----------------------------- desktop table ----------------------------- */

function DesktopTable() {
  const [active, setActive] = useState<PackageId | null>(null);
  const col = (id: PackageId, rec: boolean) => `${rec ? "bg-accent/[0.06]" : ""} ${active === id ? "bg-fg/[0.03]" : ""} transition-colors duration-fast`;
  return (
    <div className="hidden lg:block">
      <table className="w-full border-separate border-spacing-0 text-left">
        <caption className="sr-only">Package comparison: Pilot, Core, Plus and Scale</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[24%] rounded-tl-card border border-r-0 border-border bg-card p-6 align-bottom">
              <span className="flex h-full flex-col justify-end">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--gradient-accent)", boxShadow: "var(--light-medium)" }} aria-hidden="true">
                  <Users size={22} className="text-fg" />
                </span>
                <span className="text-[16px] font-bold text-fg">{t.cornerLabel}</span>
              </span>
            </th>
            {packages.map((p, i) => {
              const rec = !!p.recommended;
              return (
                <th
                  key={p.id}
                  scope="col"
                  className={`relative w-[19%] border border-l-0 border-border align-top ${i === packages.length - 1 ? "rounded-tr-card" : ""} ${rec ? "border-t-accent bg-accent/[0.06]" : "bg-card"} ${col(p.id, false)}`}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.id)}
                  onBlur={() => setActive(null)}
                >
                  {p.badge && (
                    <span className="absolute left-5 top-0 z-10 -translate-y-1/2 xl:left-6">
                      <Badge p={p} />
                    </span>
                  )}
                  {rec && <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />}
                  <PlanCard p={p} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" colSpan={5} className="border-x border-border bg-bg px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              {t.groupCommercial}
            </th>
          </tr>
          {(
            [
              { key: "setup", icon: "settings", cell: (p: Package) => setupLabel(p) },
              { key: "ongoing", icon: "repeat", cell: (p: Package) => ongoingLabel(p) },
              { key: "meetings", icon: "calendar-check", cell: (p: Package) => p.meetingsPerYear },
            ] as const
          ).map((row) => (
            <tr key={row.key}>
              <th scope="row" className="border-x border-t border-border bg-card px-6 py-4 font-medium">
                <FeatureLabel name={t.rows[row.key]} icon={row.icon} />
              </th>
              {packages.map((p) => (
                <td key={p.id} className={`border-r border-t border-border px-4 py-4 text-center text-[15px] font-semibold text-fg ${col(p.id, !!p.recommended)}`}>
                  {row.cell(p)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row" colSpan={5} className="border-x border-t border-border bg-bg px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              {t.groupFeatures}
            </th>
          </tr>
          {pricingFeatures.map((f, i) => {
            const last = i === pricingFeatures.length - 1;
            return (
              <tr key={f.id}>
                <th scope="row" className={`border-x border-t border-border bg-card px-6 py-3.5 font-medium ${last ? "rounded-bl-card border-b" : ""}`}>
                  <FeatureLabel name={f.name} icon={f.icon} note={f.note} />
                </th>
                {packages.map((p, k) => (
                  <td key={p.id} className={`border-r border-t border-border px-4 py-3.5 text-center ${last ? "border-b" : ""} ${last && k === packages.length - 1 ? "rounded-br-card" : ""} ${col(p.id, !!p.recommended)}`}>
                    <Mark on={f[p.id]} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-4 text-[12px] text-muted">{t.footnote}</p>
    </div>
  );
}

/* ------------------------------ mobile cards ------------------------------ */

function MobileCards() {
  const [open, setOpen] = useState<PackageId | null>("plus");
  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {packages.map((p) => {
        const rec = !!p.recommended;
        const isOpen = open === p.id;
        const panelId = `pkg-${p.id}`;
        return (
          <section key={p.id} aria-labelledby={`${panelId}-name`} className={`relative rounded-card border bg-card p-5 ${rec ? "border-accent/60 shadow-glow" : "border-border"}`}>
            {p.badge && (
              <span className="absolute left-5 top-0 -translate-y-1/2">
                <Badge p={p} />
              </span>
            )}
            <div className="pt-1">
              <p className={`text-[12px] font-bold uppercase tracking-[0.12em] ${rec ? "text-accent-display" : "text-muted"}`}>{t.modelLabel[p.model]}</p>
              <h3 id={`${panelId}-name`} className="mt-1.5 text-[24px] font-extrabold leading-none tracking-[-0.02em] text-fg">
                {p.name}
              </h3>
              <p className="mt-2 text-[14px] text-muted">{p.positioning}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 rounded-field bg-bg p-3 text-[13px]">
                <div>
                  <dt className="text-muted">{t.rows.setup}</dt>
                  <dd className="font-semibold text-fg">{setupLabel(p)}</dd>
                </div>
                <div>
                  <dt className="text-muted">{t.rows.ongoing}</dt>
                  <dd className="font-semibold text-fg">{ongoingLabel(p)}</dd>
                </div>
                <div>
                  <dt className="text-muted">{t.rows.meetings}</dt>
                  <dd className="font-semibold text-fg">{p.meetingsPerYear}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[13px] font-semibold text-fg">{p.bestFor}</p>
              <div className="mt-4">
                <BookCallLink location={`pricing-card-${p.id}`} service="pricing" variant={rec ? "accent" : "ghost"} className="w-full">
                  {p.cta}
                </BookCallLink>
              </div>
              <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : p.id)} className="mt-4 flex w-full items-center justify-between border-t border-border pt-4 text-[14px] font-semibold text-fg">
                {isOpen ? t.mobileHide : t.mobileShow}
                <ChevronDown size={18} className={`transition-transform duration-[280ms] ease-flowa motion-reduce:transition-none ${isOpen ? "rotate-180 text-accent" : "text-muted"}`} aria-hidden="true" />
              </button>
              <div id={panelId} className="grid overflow-hidden transition-[grid-template-rows] duration-[280ms] ease-flowa motion-reduce:transition-none" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <ul className="overflow-hidden">
                  {pricingFeatures.map((f) => (
                    <li key={f.id} className={`flex items-center justify-between gap-3 border-t border-border py-2.5 first:mt-3 ${f[p.id] ? "" : "opacity-60"}`}>
                      <FeatureLabel name={f.name} icon={f.icon} note={f.note} />
                      <Mark on={f[p.id]} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
      <p className="text-[12px] text-muted">{t.footnote}</p>
    </div>
  );
}

export function PricingTable({ children }: { children?: ReactNode }) {
  return (
    <div>
      <DesktopTable />
      <MobileCards />
      {children}
    </div>
  );
}
