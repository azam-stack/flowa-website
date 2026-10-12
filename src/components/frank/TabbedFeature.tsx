import { useEffect, useId, useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { Chip } from "./Chip";
import { FrankAvatar } from "./FrankAvatar";
import { Check, Search } from "./Icons";
import { Avatar, ChannelBadge, MockCard } from "./Mocks";
import { asset } from "@/lib/asset";
import { SectionHeading, Section } from "./SectionHeading";
import { Sphere } from "./Sphere";

const INTERVAL_MS = 5000;
const m = home.tabbed.mock;

/** The four mock-ups, one per tab. Fictional people and companies only. Rows slide in one by one. */
function MainCard({ tab }: { tab: string }) {
  if (tab === "moment")
    return (
      <MockCard className="overflow-hidden p-0 md:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <p className="min-w-0 text-[17px] text-ink">
            <strong className="font-semibold">{m.countBold}</strong>
            {m.countRest}
          </p>
          <span className="flex items-center gap-2 text-[13px] text-muted">
            <span className="relative inline-block h-5 w-9 rounded-pill bg-ink">
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
            </span>
            {m.toggle}
          </span>
        </div>
        <ul className="divide-y divide-line">
          {m.prospects.map((p, i) => (
            <li key={p.name} className="row-in flex items-center gap-3 px-5 py-3" style={{ "--i": i } as CSSProperties}>
              <Avatar name={p.name} size={40} status={i === 0 ? "live" : undefined} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ink">{p.name}</p>
                <p className="truncate text-[12px] text-muted">
                  {p.title} · {p.company}
                </p>
              </div>
              <span className="hidden flex-none rounded-pill bg-panel px-2.5 py-1 text-[11px] font-medium text-brand-deep sm:inline">{p.signal}</span>
              <span className="flex-none text-[12px] text-muted">{p.size}</span>
            </li>
          ))}
        </ul>
      </MockCard>
    );
  if (tab === "person")
    return (
      <MockCard>
        <div className="flex items-center gap-3">
          <Avatar name="Oliver Hart" size={48} />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-ink">Oliver Hart</p>
            <p className="truncate text-[12px] text-muted">Head of Sales · Brightline Software · 120 people</p>
          </div>
          <span className="ml-auto flex-none rounded-pill bg-ink px-2.5 py-1 text-[11px] font-medium text-white">Passed</span>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {["Real decision-maker, not just the poster", "Right industry and size", "Right market: UK", "Dated signal: two SDR roles, 2 days ago"].map((t, i) => (
            <li key={t} className="row-in flex items-center gap-2.5 rounded-[10px] bg-soft px-3 py-2.5 text-[13px] text-ink-2" style={{ "--i": i } as CSSProperties}>
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-ink">
                <Check size={12} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </MockCard>
    );
  if (tab === "words")
    return (
      <MockCard>
        <div className="flex items-center gap-3">
          <Avatar name="Oliver Hart" size={40} />
          <p className="min-w-0 truncate text-[12px] text-muted">Draft to Oliver Hart · Brightline Software</p>
          <ChannelBadge kind="linkedin" size={26} className="ml-auto" />
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
          <mark className="rounded-[6px] bg-panel px-1 py-0.5 text-ink">Hi Oliver, saw Brightline posted two SDR roles this week and opened a Manchester office.</mark> Until those hires are productive, there is a gap in pipeline. We help UK software teams fill exactly that gap. Worth 20 minutes?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip>Opens with what they said</Chip>
          <Chip tone="line">Written for one person</Chip>
        </div>
      </MockCard>
    );
  return (
    <MockCard>
      <p className="text-[13px] font-semibold text-muted">Review queue · today</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {[
          ["Oliver Hart", "LinkedIn · first message", "Approved"],
          ["Priya Nair", "Email · follow-up", "Approved"],
          ["Tom Whitfield", "LinkedIn · first message", "Edited, then approved"],
        ].map(([n, t, st], i) => (
          <li key={n} className="row-in flex items-center gap-3" style={{ "--i": i } as CSSProperties}>
            <Avatar name={n} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{n}</p>
              <p className="truncate text-[12px] text-muted">{t}</p>
            </div>
            <span className="flex flex-none items-center gap-1.5 rounded-pill bg-soft px-2.5 py-1 text-[11px] font-medium text-ink">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-brand">
                <Check size={9} />
              </span>
              {st}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3">
        <img src={asset("images/team/ahmed.webp")} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 rounded-full object-cover" />
        <p className="text-[12px] text-ink-2">Checked by Ahmed before sending</p>
      </div>
    </MockCard>
  );
}

function PromptCard() {
  return (
    <MockCard className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <FrankAvatar decorative round className="h-10 w-10 flex-none" />
        <p className="text-[14px] text-ink-2">
          {m.promptLead}
          <strong className="font-semibold text-ink">{m.promptBold}</strong>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-10 min-w-[160px] flex-1 items-center truncate rounded-control border border-line px-3 text-[13px] text-muted">{m.promptPlaceholder}</span>
        <span className="btn btn-primary h-10 flex-none px-4 text-[14px]">
          <Search size={15} /> {m.search}
        </span>
      </div>
    </MockCard>
  );
}

/**
 * The "precision" tabbed feature card (brief §4.3): a dark wavy
 * mock-up panel on top, four tab columns below. The active title is
 * serif ink, the rest muted; a click or the 5-second auto-advance swaps
 * the mock-up and a thin orange progress line runs under the active tab.
 * On mobile the tabs become a horizontal row of pills.
 */
export function TabbedFeature() {
  const t = home.tabbed;
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const { ref, active: onScreen } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const baseId = useId();

  const running = onScreen && !paused && !reduced;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setActive((a) => (a + 1) % t.tabs.length);
      setRound((r) => r + 1);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, round, t.tabs.length]);

  const select = (i: number) => {
    setActive(i);
    setRound((r) => r + 1);
  };

  const tab = t.tabs[active];
  return (
    <Section>
      <Container>
        <div className="relative">
          <SectionHeading eyebrow={t.eyebrow} title={t.h2} sub={t.sub} />
          <Sphere size={84} tint={1} mark className="absolute right-[6%] top-0 hidden lg:block xl:right-[14%]" duration={6.5} rotate={-12} />
        </div>
        <div ref={ref} className="framed mt-12 overflow-hidden md:mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="relative overflow-hidden p-5 md:p-10" style={{ backgroundColor: "#0C0C0B" }}>
            <img src={asset("images/backgrounds/silk-dark.webp")} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
            <span className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-brand/40 blur-3xl" />
            <div key={`${active}-${round}`} className="swap-in relative grid min-w-0 gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-end" id={`${baseId}-panel-${active}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
              <div className="min-w-0">
                <MainCard tab={tab.key} />
              </div>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {m.sources.map((s) => (
                    <Chip key={s} tone="light">
                      {s}
                    </Chip>
                  ))}
                </div>
                <PromptCard />
              </div>
            </div>
          </div>

          {/* desktop: four columns */}
          <div role="tablist" aria-label={t.h2} className="hidden border-t border-ink md:grid md:grid-cols-4 md:divide-x md:divide-ink">
            {t.tabs.map((tb, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tb.key}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") select((i + 1) % t.tabs.length);
                    if (e.key === "ArrowLeft") select((i - 1 + t.tabs.length) % t.tabs.length);
                  }}
                  className="relative p-6 text-left transition-colors hover:bg-soft lg:p-7"
                >
                  <span className={`serif block text-[24px] leading-tight transition-colors lg:text-[26px] ${isActive ? "text-ink" : "text-muted"}`}>{tb.title}</span>
                  <span className={`mt-2 block text-[15px] font-semibold ${isActive ? "text-ink" : "text-muted"}`}>{tb.feature}</span>
                  <span className={`mt-1.5 block text-[14px] leading-relaxed ${isActive ? "text-ink-2" : "text-muted"}`}>{tb.body}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-line">{isActive && <span key={round} className={`block h-full w-full bg-brand ${running ? "tab-progress" : ""}`} />}</span>
                </button>
              );
            })}
          </div>

          {/* mobile: pills + the active description */}
          <div className="border-t border-ink md:hidden">
            <div role="tablist" aria-label={t.h2} className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-4">
              {t.tabs.map((tb, i) => (
                <button key={tb.key} role="tab" aria-selected={i === active} onClick={() => select(i)} className={`flex-none rounded-pill border px-4 py-2 text-[14px] font-medium transition-colors ${i === active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2"}`}>
                  {tb.title}
                </button>
              ))}
            </div>
            <div key={`m-${active}`} className="fade-in px-4 pb-5 pt-4">
              <p className="serif text-[22px] text-ink">{tab.title}</p>
              <p className="mt-1 text-[15px] font-semibold text-ink">{tab.feature}</p>
              <p className="mt-1 text-[14px] text-ink-2">{tab.body}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
