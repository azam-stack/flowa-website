import { useId, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { meetingValue as t } from "@/content/frank/snapshot";
import { SectionHeading, Section } from "./SectionHeading";

const PILOT = 400;
const SETUP = 500;
const SHOW = 0.7;
const WIN = 0.47;
const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

/** Deal-size slider: log scale from £1k to £100k so small and large deals both get room. */
const DEAL_MIN = 1000;
const DEAL_MAX = 100000;
const dealFromPos = (p: number) => Math.round(Math.exp(Math.log(DEAL_MIN) + (Math.log(DEAL_MAX) - Math.log(DEAL_MIN)) * p) / 250) * 250;
const posFromDeal = (d: number) => (Math.log(d) - Math.log(DEAL_MIN)) / (Math.log(DEAL_MAX) - Math.log(DEAL_MIN));

/**
 * "What would Flowa be worth to you?": two sliders on the left and the
 * answer as money; the funnel on the right drawn from the same numbers,
 * with the stages Flowa actually measures (booked, held, won). Runs only
 * in the browser; nothing is sent or stored.
 */
export function MeetingValue() {
  const uid = useId();
  const [deal, setDeal] = useState(8000);
  const [booked, setBooked] = useState(10);
  const held = booked * SHOW;
  const won = held * WIN;
  const revenue = won * deal;
  const meetingsCost = held * PILOT;
  const total = meetingsCost + SETUP;
  const diff = revenue - total;
  const back = total > 0 ? revenue / total : 0;
  const wonShown = won.toFixed(1).replace(/\.0$/, "");
  const more = t.moreThan(gbp(diff), `£${back >= 10 || Number.isInteger(Number(back.toFixed(1))) ? Math.round(back) : back.toFixed(1)}`);

  return (
    <Section id="meeting-value">
      <Container>
        <SectionHeading title={<>{t.h2Light}<span className="dim">{t.h2Bold}</span></>} sub={t.sub} />
        <Reveal className="roi mx-auto mt-10 grid max-w-[1180px] gap-4 md:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* inputs + answer */}
          <div className="rounded-frame border border-line bg-soft p-6 md:p-8">
            <Slider id={`${uid}-deal`} label={t.dealLabel} hint={t.dealHint} value={gbp(deal)} pos={posFromDeal(deal)} onPos={(p) => setDeal(dealFromPos(p))} ticks={[gbp(DEAL_MIN), gbp(10000), gbp(DEAL_MAX)]} />
            <div className="my-6 border-t border-line" />
            <Slider id={`${uid}-meet`} label={t.meetingsLabel} hint={t.meetingsHint} value={String(booked)} pos={(booked - 4) / 26} onPos={(p) => setBooked(Math.round(4 + p * 26))} ticks={["4", "17", "30"]} />
            <div className="my-6 border-t border-line" />
            <p className="mono-label text-muted">{t.estimateEyebrow}</p>
            <p className="mt-2 text-[clamp(2.6rem,1.8rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink" aria-live="polite">
              {gbp(revenue)}
              <span className="ml-1 text-[0.4em] font-normal text-muted">{t.perMonth}</span>
            </p>
            <p className="mt-2 text-[15px] text-ink-2">{t.estimateFormula(wonShown, gbp(deal))}</p>

            <div className="mt-6 rounded-[16px] border border-line bg-surface p-5">
              <Row title={t.costTitle} sub={t.costFormula(held.toFixed(1).replace(/\.0$/, ""), gbp(PILOT))} value={gbp(meetingsCost)} unit={t.perMonth} />
              <Row title={t.setupTitle} sub={t.setupFormula} value={gbp(SETUP)} />
              <div className="my-4 border-t border-line" />
              <Row title={t.totalTitle} sub="" value={gbp(total)} unit={t.perMonth} strong />
              <p className="mt-4 text-[15px] leading-snug text-ink">
                {more[0]}
                <strong className={diff >= 0 ? "" : "text-brand-dark"}>{more[1]}</strong>
                {more[2]}
              </p>
              <p className="mt-1 text-[13px] text-muted">{t.perDeal(gbp(won > 0 ? meetingsCost / won : 0))}</p>
            </div>
          </div>

          {/* funnel */}
          <div className="rounded-frame border border-line bg-surface p-6 md:p-8">
            <p className="mono-label text-muted">{t.funnelEyebrow}</p>
            <Funnel values={[booked, held, won]} />
          </div>
        </Reveal>
        <p className="mx-auto mt-4 max-w-[1180px] text-[13px] text-muted">{t.note}</p>
      </Container>
    </Section>
  );
}

function Slider({ id, label, hint, value, pos, onPos, ticks }: { id: string; label: string; hint: string; value: string; pos: number; onPos: (p: number) => void; ticks: string[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[16px] font-medium text-ink">
          {label}
        </label>
        <span className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{value}</span>
      </div>
      <p className="mt-0.5 text-[14px] text-muted">{hint}</p>
      <input id={id} type="range" min={0} max={1000} step={1} value={Math.round(pos * 1000)} onChange={(e) => onPos(Number(e.target.value) / 1000)} className="roi-range mt-4" style={{ "--p": `${pos * 100}%` } as React.CSSProperties} />
      <div className="mt-1 flex justify-between text-[13px] text-muted">
        {ticks.map((tk) => (
          <span key={tk}>{tk}</span>
        ))}
      </div>
    </div>
  );
}

function Row({ title, sub, value, unit, strong }: { title: string; sub: string; value: string; unit?: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <p className={`text-[15px] ${strong ? "font-semibold" : "font-medium"} text-ink`}>{title}</p>
        {sub && <p className="text-[13px] text-muted">{sub}</p>}
      </div>
      <p className={`whitespace-nowrap tabular-nums ${strong ? "text-[24px] font-semibold" : "text-[20px] font-medium"} tracking-[-0.02em] text-ink`}>
        {value}
        {unit && <span className="ml-0.5 text-[13px] font-normal text-muted">{unit}</span>}
      </p>
    </div>
  );
}

/** Three columns. The band's height at each column's left edge is that stage's number, easing across the column to the next; the last column is filled solid. */
function Funnel({ values }: { values: number[] }) {
  const W = 600;
  const H = 540;
  const pad = 14;
  const cols = values.length;
  const cw = W / cols;
  const max = values[0] || 1;
  const hs = values.map((v) => Math.max(10, (v / max) * (H - pad * 2)));
  const mid = H / 2;
  const xs = values.map((_, i) => i * cw);
  const top = (i: number) => mid - hs[i] / 2;
  const bot = (i: number) => mid + hs[i] / 2;
  const k = cw * 0.45;
  let d = `M ${xs[0]} ${top(0)}`;
  for (let i = 0; i < cols - 1; i++) d += ` C ${xs[i] + k} ${top(i)}, ${xs[i + 1] - k} ${top(i + 1)}, ${xs[i + 1]} ${top(i + 1)}`;
  d += ` L ${W} ${top(cols - 1)} L ${W} ${bot(cols - 1)} L ${xs[cols - 1]} ${bot(cols - 1)}`;
  for (let i = cols - 1; i > 0; i--) d += ` C ${xs[i] - k} ${bot(i)}, ${xs[i - 1] + k} ${bot(i - 1)}, ${xs[i - 1]} ${bot(i - 1)}`;
  d += " Z";
  const last = { x0: xs[cols - 1], x1: W, y0: top(cols - 1), y1: bot(cols - 1) };
  const pts = xs.map((x) => ({ x0: x }));
  const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
  const pct = (i: number) => (i === 0 ? "" : `${Math.round((values[i] / values[i - 1]) * 100)}%`);

  return (
    <div className="mt-6">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {t.stages.map((s, i) => (
          <div key={s.key} className="border-l border-line pl-4">
            <p className="flex items-center gap-2 text-[14px] text-ink-2">
              <span className={`inline-block h-2.5 w-2.5 ${i === cols - 1 ? "bg-brand" : "roi-hatch-dot"}`} />
              {s.label}
            </p>
            <p className="mt-1 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums" aria-live="polite">
              {fmt(values[i])}
            </p>
            <p className="mt-1 text-[12.5px] text-muted">{s.hint}</p>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 h-auto w-full" aria-hidden="true">
        <defs>
          <pattern id="roi-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#FFF4EE" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#E8511A" strokeWidth="1.2" />
          </pattern>
        </defs>
        {pts.map((p, i) => (
          <line key={i} x1={p.x0} y1={0} x2={p.x0} y2={H} stroke="rgba(14,11,9,0.1)" />
        ))}
        <line x1={0} y1={mid} x2={W} y2={mid} stroke="rgba(14,11,9,0.12)" strokeDasharray="3 5" />
        <path d={d} fill="url(#roi-hatch)" stroke="#E8511A" strokeWidth="1.5" className="roi-band" />
        <rect x={last.x0} y={last.y0} width={last.x1 - last.x0} height={last.y1 - last.y0} fill="#E8511A" className="roi-band" />
        {pts.slice(1).map((p, i) => (
          <g key={i} transform={`translate(${p.x0}, ${mid})`}>
            <rect x={-30} y={-14} width={60} height={28} rx={14} fill="#fff" stroke="rgba(14,11,9,0.12)" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill="#0E0B09" fontFamily="inherit">
              {pct(i + 1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
