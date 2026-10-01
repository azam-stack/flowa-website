import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { avatarFor } from "@/content/frank/people";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { asset } from "@/lib/asset";
import { Chip } from "./Chip";
import { CountUp } from "./CountUp";
import { Check, Mail, Calendar, Target, Search } from "./Icons";

/**
 * Product mock-ups (design upgrade §3): layered cards on the dark silk
 * backdrop with an orange glow, real (generated, fictional) faces, round
 * black channel badges and dense, app-like detail. Built in HTML/CSS.
 * Every name and company is fictional and every panel is illustrative.
 */
export function DarkMock({ title, count, children, className = "" }: { title?: string; count?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-[20px] p-5 text-white md:p-6 ${className}`} aria-hidden="true" style={{ backgroundColor: "#0C0C0B" }}>
      <img src={asset("images/backgrounds/silk-dark.webp")} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90" />
      <span className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-brand/35 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
      <div className="relative flex min-w-0 flex-col gap-4">
        {title && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-[15px] font-medium md:text-[16px]">{count ? <CountUp value={count} /> : title}</p>
            <span className="flex items-center gap-1.5 text-[12px] text-white/70">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand text-brand" />
              live
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/** The front white UI card: lifted with the deep shadow. */
export function MockCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 rounded-card bg-white p-4 text-ink shadow-lift md:p-5 ${className}`}>{children}</div>;
}

/** A glassy card that sits behind the front card. */
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass min-w-0 rounded-card p-3 text-ink ${className}`}>{children}</div>;
}

/** A fictional person's face (40–56px) with an optional status badge; falls back to initials. */
export function Avatar({ name, size = 40, status, className = "" }: { name: string; size?: number; status?: "live" | "ok"; className?: string }) {
  const src = avatarFor(name);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <span className={`relative inline-block flex-none ${className}`} style={{ width: size, height: size }}>
      {src ? (
        <img src={asset(src)} alt="" width={size} height={size} loading="lazy" decoding="async" className="h-full w-full scale-[1.08] rounded-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center rounded-full bg-panel text-[12px] font-semibold text-ink">{initials}</span>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white" />
      {status && (
        <span className={`absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full ring-2 ring-white ${status === "ok" ? "bg-brand text-ink" : "bg-[#2BB673]"}`}>
          {status === "ok" && <Check size={9} />}
        </span>
      )}
    </span>
  );
}

/** Round black channel badges, the way product UIs show where a message goes. Only Flowa's real channels. */
export function ChannelBadge({ kind, size = 28, className = "" }: { kind: "linkedin" | "email" | "calendar"; size?: number; className?: string }) {
  return (
    <span className={`inline-grid flex-none place-items-center rounded-full bg-ink text-white ${className}`} style={{ width: size, height: size }}>
      {kind === "linkedin" ? (
        <span className="font-semibold leading-none" style={{ fontSize: size * 0.42 }}>
          in
        </span>
      ) : kind === "email" ? (
        <Mail size={size * 0.5} />
      ) : (
        <Calendar size={size * 0.5} />
      )}
    </span>
  );
}

/** Row 1: companies scanned, a highlighted prospect with its reasons, two glassy prospects behind. */
export function ScanMock({ className = "" }: { className?: string }) {
  return (
    <DarkMock title="1,240 companies scanned" count="1,240 companies scanned" className={className}>
      <div className="h-1.5 w-full overflow-hidden rounded-pill bg-white/15">
        <div className="h-full w-[72%] rounded-pill bg-brand" />
      </div>
      <div className="relative">
        <GlassCard className="absolute inset-x-6 -top-3 h-full opacity-70" >
          <span />
        </GlassCard>
        <MockCard className="relative">
          <div className="flex items-center gap-3">
            <Avatar name="Oliver Hart" size={48} status="live" />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold">Oliver Hart</p>
              <p className="truncate text-[12px] text-muted">Head of Sales · Brightline Software · 120 people</p>
            </div>
            <span className="ml-auto flex-none rounded-pill bg-ink px-2.5 py-1 text-[11px] font-medium text-white">ICP 92</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Why now: hiring two SDRs</Chip>
            <Chip tone="line">Open with: new UK office</Chip>
          </div>
        </MockCard>
      </div>
      <Reveal stagger className="grid grid-cols-2 gap-3">
        {[
          ["Priya Nair", "CRO · Northgate IT"],
          ["Tom Whitfield", "Founder · Kestrel Creative"],
        ].map(([n, t]) => (
          <div key={n} className="flex items-center gap-2.5 rounded-card border border-white/15 bg-white/[0.08] p-3 backdrop-blur-md">
            <Avatar name={n} size={36} />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-white">{n}</p>
              <p className="truncate text-[11px] text-white/60">{t}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </DarkMock>
  );
}

/** Row 2: the first line, drafted by Frank and approved by a person. The text types itself once in view. */
export function DraftMock({ className = "" }: { className?: string }) {
  const msg = "Hi Hannah, congrats on the Series A. Saw you're hiring your first two SDRs. We help SaaS teams get new reps booking meetings in weeks, not months. Worth a quick chat?";
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.4 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(msg.length);
  useEffect(() => {
    if (!inView || reduced) return;
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 3;
      setN(Math.min(i, msg.length));
      if (i >= msg.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, reduced, msg.length]);
  const done = n >= msg.length;
  return (
    <DarkMock title="Draft ready for review" className={className}>
      <div ref={ref} className="relative">
        <GlassCard className="absolute -right-2 -top-3 left-8 h-full opacity-60">
          <span />
        </GlassCard>
        <MockCard className="relative">
          <div className="flex items-center gap-3">
            <Avatar name="Hannah Lee" size={44} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">To: Hannah Lee</p>
              <p className="truncate text-[12px] text-muted">VP Sales · Brightline Software</p>
            </div>
            <ChannelBadge kind="linkedin" className="ml-auto" />
          </div>
          <p className="mt-3 min-h-[96px] rounded-[12px] bg-soft p-3 text-[13px] leading-relaxed text-ink-2">
            {msg.slice(0, n)}
            {!done && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-ink" />}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Chip tone="line">Opens with their own news</Chip>
            <Chip tone="line">No template</Chip>
          </div>
        </MockCard>
      </div>
      <div className={`flex items-center gap-3 rounded-card border border-white/15 bg-white/[0.08] p-3 backdrop-blur-md transition-opacity duration-500 ${done ? "opacity-100" : "opacity-40"}`}>
        <img src={asset("images/team/ahmed.webp")} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 flex-none rounded-full object-cover ring-2 ring-white" />
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-white">Checked and approved by Ahmed</p>
          <p className="text-[11px] text-white/60">Sent at a human pace · LinkedIn</p>
        </div>
        <span className={`ml-auto grid h-7 w-7 flex-none place-items-center rounded-full bg-brand text-ink ${done ? "check-pop" : "opacity-0"}`}>
          <Check size={14} />
        </span>
      </div>
    </DarkMock>
  );
}

/** Row 3: new meetings booked, a week calendar that fills slot by slot, a qualified-lead insight. */
export function CalendarMock({ className = "" }: { className?: string }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks: Record<string, { top: number; label: string; tone: "brand" | "white"; i: number }[]> = {
    Mon: [{ top: 34, label: "Intro call", tone: "white", i: 0 }],
    Tue: [{ top: 8, label: "Meeting", tone: "brand", i: 1 }],
    Wed: [{ top: 46, label: "Meeting", tone: "brand", i: 2 }],
    Thu: [
      { top: 20, label: "Meeting", tone: "brand", i: 3 },
      { top: 62, label: "Follow-up", tone: "white", i: 5 },
    ],
    Fri: [{ top: 30, label: "Meeting", tone: "brand", i: 4 }],
  };
  return (
    <DarkMock title="4 new meetings booked" count="4 new meetings booked" className={className}>
      <MockCard className="p-3 md:p-3">
        <Reveal className="grid grid-cols-5 gap-1.5" threshold={0.4}>
          {days.map((d) => (
            <div key={d} className="relative h-[112px] rounded-[8px] bg-soft">
              <p className="px-1.5 pt-1 text-[10px] font-medium text-muted">{d}</p>
              {blocks[d].map((b) => (
                <span
                  key={b.label + b.top}
                  className={`slot absolute left-1 right-1 rounded-[6px] px-1.5 py-1 text-[10px] font-medium leading-none ${b.tone === "brand" ? "bg-brand text-ink" : "border border-line bg-white text-ink-2"}`}
                  style={{ top: 18 + b.top, "--i": b.i } as React.CSSProperties}
                >
                  {b.label}
                </span>
              ))}
            </div>
          ))}
        </Reveal>
      </MockCard>
      <div className="relative">
        <GlassCard className="absolute inset-x-5 -top-2.5 h-full opacity-60">
          <span />
        </GlassCard>
        <MockCard className="relative flex items-center gap-3">
          <Avatar name="Priya Nair" size={44} status="ok" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">Tue 10:00 · Priya Nair, CRO</p>
            <p className="truncate text-[12px] text-muted">Decision-maker · ICP match · brief attached</p>
          </div>
          <ChannelBadge kind="calendar" className="ml-auto" />
        </MockCard>
      </div>
    </DarkMock>
  );
}

/** Signals with a reply-rate trend line that draws itself. */
export function SignalsMock({ className = "" }: { className?: string }) {
  const rows = ["Posted two SDR roles this week", "Appointed a new Head of Sales", "Registered a UK entity"];
  const pts = "M8 70 L60 62 L112 66 L164 48 L216 42 L268 28 L312 18";
  return (
    <DarkMock title="3 new signals detected" className={className}>
      <Reveal stagger className="flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r} className="flex items-center justify-between gap-3 rounded-card border border-white/15 bg-white/[0.08] px-3 py-2.5 backdrop-blur-md">
            <p className="min-w-0 truncate text-[13px] text-white">{r}</p>
            <Chip>Buying signal</Chip>
          </div>
        ))}
      </Reveal>
      <MockCard>
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-medium text-muted">Reply rate, last 6 weeks</p>
          <p className="text-[13px] font-semibold text-ink">rising</p>
        </div>
        <Reveal threshold={0.5}>
          <svg viewBox="0 0 320 90" className="mt-2 h-20 w-full" aria-hidden="true">
            <path className="fill-area" d={`${pts} L312 88 L8 88 Z`} fill="#EE9E47" />
            <path className="draw-line" pathLength={1} d={pts} fill="none" stroke="#EE9E47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Reveal>
      </MockCard>
    </DarkMock>
  );
}

/** Mock-ups for the four How Frank works steps. */
export function StepMock({ kind, className = "" }: { kind: "target" | "reach" | "qualify" | "book"; className?: string }) {
  if (kind === "target")
    return (
      <DarkMock className={className}>
        <MockCard>
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <Target size={16} /> Ideal customer
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>UK B2B SaaS</Chip>
            <Chip>50–200 people</Chip>
            <Chip>Head of Sales</Chip>
            <Chip tone="line">Qualified = role + interest + fit</Chip>
          </div>
        </MockCard>
        <GlassCard className="flex items-center gap-2 text-[12px]">
          <Search size={14} /> 214 companies match this week
        </GlassCard>
      </DarkMock>
    );
  if (kind === "reach")
    return (
      <DarkMock className={className}>
        <Reveal stagger className="flex flex-col gap-2">
          {[
            ["linkedin", "LinkedIn · Hannah Lee", "Opens with the Series A · approved"],
            ["email", "Email · Oliver Hart", "Opens with the new office · approved"],
            ["linkedin", "LinkedIn · Priya Nair", "Short follow-up, three days later"],
          ].map(([k, t, s], i) => (
            <div key={i} className="flex items-center gap-3 rounded-card bg-white p-3 text-ink shadow-lift">
              <Avatar name={t.split(" · ")[1]} size={36} />
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold">{t}</p>
                <p className="truncate text-[12px] text-muted">{s}</p>
              </div>
              <ChannelBadge kind={k as "linkedin" | "email"} size={24} className="ml-auto" />
            </div>
          ))}
        </Reveal>
      </DarkMock>
    );
  if (kind === "qualify")
    return (
      <DarkMock className={className}>
        <MockCard>
          <div className="flex items-center gap-3">
            <Avatar name="Oliver Hart" size={40} />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold">Oliver Hart · Brightline Software</p>
              <p className="truncate text-[12px] text-muted">Signal: hiring two SDRs · 2 days ago</p>
            </div>
          </div>
          <Reveal stagger className="mt-3 flex flex-col gap-1.5">
            {["Decision-maker", "Right industry and size", "Right market", "Dated signal we can point to"].map((c) => (
              <span key={c} className="flex items-center gap-2 text-[12px] text-ink-2">
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-ink">
                  <Check size={11} />
                </span>
                {c}
              </span>
            ))}
          </Reveal>
        </MockCard>
      </DarkMock>
    );
  return (
    <DarkMock className={className}>
      <MockCard className="flex items-center gap-3">
        <Avatar name="Priya Nair" size={40} status="ok" />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">Tue 10:00 · First meeting</p>
          <p className="truncate text-[12px] text-muted">Priya Nair, Northgate IT Services</p>
        </div>
        <ChannelBadge kind="calendar" size={26} className="ml-auto" />
      </MockCard>
      <GlassCard>
        <p className="text-[12px] font-semibold">Before you join</p>
        <ul className="mt-1.5 flex flex-col gap-1 text-[12px] text-ink-2">
          <li>Why now: rebuilding outbound this quarter</li>
          <li>Open with: the new Manchester office</li>
          <li>Agreed criteria: met</li>
        </ul>
      </GlassCard>
    </DarkMock>
  );
}

/** A buying signal as a dark card with orange chips (the /signals examples). */
export function SignalExampleCard({ n, signal, meaning, signalLabel, meaningLabel }: { n: string; signal: string; meaning: string; signalLabel: string; meaningLabel: string }) {
  return (
    <div className="mock-dark flex flex-col gap-4 p-6 md:p-7">
      <div className="flex items-center justify-between">
        <Chip>
          <Search size={13} /> {signalLabel}
        </Chip>
        <span className="text-[13px] text-white/50">{n}</span>
      </div>
      <p className="text-[18px] font-medium leading-snug text-white md:text-[20px]">{signal}</p>
      <div className="rounded-card bg-white p-4 text-ink">
        <p className="text-[12px] font-semibold text-muted">{meaningLabel}</p>
        <p className="mt-1 text-[15px] leading-relaxed">{meaning}</p>
      </div>
    </div>
  );
}

/** Hero left card: the signal cycles every 4 s with a fade and slide. */
export function HeroSignalMini() {
  const items = home.hero.cards.left.cycle;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced || !active) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % items.length), 4000);
    return () => window.clearInterval(id);
  }, [reduced, active, items.length]);
  const s = items[i];
  return (
    <div ref={ref} className="w-full rounded-card bg-white p-3.5 text-left shadow-lift" aria-hidden="true">
      <div key={i} className="swap-up">
        <div className="flex items-center justify-between gap-2">
          <Chip className="text-[12px]">{s.tag}</Chip>
          <span className="text-[11px] text-muted">{s.time}</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar name={s.person} size={36} status="live" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">{s.body}</p>
            <p className="truncate text-[11px] text-muted">{s.meta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroMeetingMini({ tag, body, time }: { tag: string; body: string; time: string }) {
  return (
    <div className="w-full rounded-card bg-white p-3.5 text-left shadow-lift" aria-hidden="true">
      <div className="flex items-center justify-between gap-2">
        <Chip className="text-[12px]">{tag}</Chip>
        <span className="whitespace-nowrap text-[11px] text-muted">{time}</span>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <Avatar name="Priya Nair" size={36} status="ok" />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-ink">{body}</p>
          <p className="truncate text-[11px] text-muted">CRO · Northgate IT</p>
        </div>
      </div>
    </div>
  );
}
