import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { Chip } from "./Chip";
import { Check, Shield } from "./Icons";
import { Avatar, ChannelBadge } from "./Mocks";
import { FlowaO, type Tint } from "./Sphere";

/**
 * Small illustrations built from product UI and the Flowa "o" (design
 * upgrade §1, replacing the stippled SVG drawings). Decorative only.
 */

/** A soft grey panel with a Flowa "o" behind a white UI card. */
function Panel({ tint, children, className = "" }: { tint: Tint; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-card bg-soft ${className}`} aria-hidden="true">
      <FlowaO tint={tint} className="absolute -right-6 -top-8 h-36 w-36 rotate-12 opacity-90" />
      <FlowaO outline stroke="#0C0C0B" className="absolute -bottom-8 -left-6 h-24 w-24 -rotate-12 opacity-10" />
      <div className="relative w-[78%]">{children}</div>
    </div>
  );
}

const card = "rounded-card bg-white p-3.5 text-ink shadow-lift";

export function FoundersVignette() {
  const pts = "M6 50 L40 44 L74 46 L108 32 L142 26 L176 14";
  return (
    <Panel tint={1}>
      <div className={card}>
        <p className="text-[11px] font-medium text-muted">Pipeline, last 6 weeks</p>
        <Reveal threshold={0.5}>
          <svg viewBox="0 0 182 58" className="mt-1 h-14 w-full">
            <path className="fill-area" d={`${pts} L176 58 L6 58 Z`} fill="#EE9E47" />
            <path className="draw-line" pathLength={1} d={pts} fill="none" stroke="#EE9E47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Reveal>
      </div>
    </Panel>
  );
}

export function SalesVignette() {
  return (
    <Panel tint={2}>
      <div className={`${card} flex items-center gap-2.5`}>
        <Avatar name="Priya Nair" size={36} status="ok" />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">Tue 10:00 · Priya Nair</p>
          <p className="truncate text-[11px] text-muted">Qualified · brief attached</p>
        </div>
        <ChannelBadge kind="calendar" size={24} className="ml-auto" />
      </div>
    </Panel>
  );
}

export function RevenueVignette() {
  return (
    <Panel tint={5}>
      <div className={card}>
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>This week</span>
          <span className="font-semibold text-ink">live</span>
        </div>
        <Reveal className="mt-2 flex items-end gap-1.5" threshold={0.5}>
          {[40, 58, 46, 72, 64, 90].map((h, i) => (
            <span key={i} className="slot w-full rounded-[3px] bg-brand" style={{ height: h / 2.4, "--i": i } as CSSProperties} />
          ))}
        </Reveal>
        <div className="mt-2 flex gap-1.5 text-[10px]">
          <Chip className="px-2 py-0.5 text-[10px]">Signals 214</Chip>
          <Chip tone="line" className="px-2 py-0.5 text-[10px]">Booked 4</Chip>
        </div>
      </div>
    </Panel>
  );
}

/** Trust strip art: a large Flowa "o" with the white logo line and a shield badge. */
export function TrustVignette() {
  return (
    <div className="relative h-36 w-44" aria-hidden="true">
      <FlowaO tint={1} mark className="absolute inset-0 h-full w-full -rotate-6" />
      <span className="absolute -bottom-1 right-2 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lift">
        <Shield size={22} />
      </span>
    </div>
  );
}

/** Statement band art (4.7): three meetings stacked like a calendar filling up. */
export function CalendarsVignette() {
  const rows = [
    ["Priya Nair", "Tue 10:00 · CRO, Northgate IT"],
    ["Oliver Hart", "Wed 14:30 · Head of Sales, Brightline"],
    ["Hannah Lee", "Thu 09:00 · VP Sales, Brightline"],
  ];
  return (
    <Reveal stagger className="flex w-full flex-col gap-3" threshold={0.3}>
      {rows.map(([n, t], i) => (
        <div key={n} className={`flex items-center gap-3 rounded-[16px] bg-white p-3 shadow-lift ${i === 1 ? "ml-6 md:ml-10" : ""}`} aria-hidden="true">
          <Avatar name={n} size={40} status="ok" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">{n}</p>
            <p className="truncate text-[12px] text-muted">{t}</p>
          </div>
          <ChannelBadge kind="calendar" size={26} className="ml-auto" />
        </div>
      ))}
    </Reveal>
  );
}
