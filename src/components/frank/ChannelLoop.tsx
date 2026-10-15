import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView } from "@/hooks/useInView";
import { Calendar, Mail, SmileyBall } from "./Icons";
import { Section } from "./SectionHeading";

/**
 * "One campaign, start to finish": the method as one picture. Three
 * channel nodes on top, Flowa in the middle, a meeting at the bottom.
 * Pulses run from Flowa out along each channel in turn (email, LinkedIn,
 * phone), the node lights up as the pulse lands, then one pulse drops
 * from Flowa to the calendar. Pure CSS: the SVG paths use pathLength=1
 * so the same keyframes drive every curve; everything pauses while the
 * card is off screen and is static under reduced motion.
 */
const W = 600;
const H = 500;
const xs = [100, 300, 500];
const NODE_Y = 64; // centre of the channel node squares
const hub = { x: 300, y: 270 };
const out = { x: 300, y: 442 };
// Literal class names so Tailwind keeps the layer rules (it drops classes it cannot see in source).
const PULSE = ["loop-pulse-0", "loop-pulse-1", "loop-pulse-2"];
const NODE = ["loop-node-0", "loop-node-1", "loop-node-2"];
const TONE = ["loop-tone-0", "loop-tone-1", "loop-tone-2"];
const at = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

export function ChannelLoop() {
  const d = home.demo;
  const c = d.card;
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.25 });

  // Stage geometry (one coordinate system for wires and nodes): three
  // channel nodes along the top, Flowa in the middle, the meeting below.
  const curve = (x: number) => `M ${hub.x} ${hub.y - 46} C ${hub.x} ${hub.y - 150}, ${x} ${NODE_Y + 110}, ${x} ${NODE_Y + 28}`;
  const drop = `M ${hub.x} ${hub.y + 46} L ${out.x} ${out.y - 24}`;

  return (
    <Section id="see-it-work">
      <Container>
        <div ref={ref} className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow text-brand-deep">{d.eyebrow}</p>
            <h2 className="mt-3 text-statement font-semibold text-ink">
              {d.h2Light}
              <br className="hidden md:block" />
              <span className="text-muted">{d.h2Bold}</span>
            </h2>
            <p className="mt-6 max-w-lead text-sub text-ink-2">{d.sub}</p>
          </Reveal>

          <Reveal>
            <div className={`loop-card ${active ? "is-live" : ""}`} data-active={active}>
              <div className="flex items-center justify-between gap-4 px-6 pt-5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
                <span>{c.label}</span>
                <span className="flex items-center gap-2 text-[#1B7F4E]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#2BB673] text-[#2BB673]" />
                  {c.status}
                </span>
              </div>

              <div className="px-5 pb-5 pt-6 md:px-8">
                <div className="loop-stage" style={{ aspectRatio: `${W} / ${H}` }}>
                  {/* Wires (the stage's coordinate system) */}
                  <svg className="loop-wires" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
                    {xs.map((x, i) => (
                      <g key={x}>
                        <path d={curve(x)} pathLength={1} className="loop-base" />
                        <path d={curve(x)} pathLength={1} className={`loop-pulse ${PULSE[i]}`} />
                      </g>
                    ))}
                    <path d={drop} pathLength={1} className="loop-base" />
                    <path d={drop} pathLength={1} className="loop-pulse loop-pulse-3" />
                  </svg>

                  {/* Channel nodes */}
                  <ul aria-label="Channels">
                    {c.channels.map((ch, i) => (
                      <li key={ch.key} className="loop-at-x flex flex-col items-center gap-3" style={at(xs[i], NODE_Y - 60)}>
                        <span className="flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold text-ink">
                          <span className={`h-1.5 w-1.5 rounded-full ${TONE[i]}`} aria-hidden="true" />
                          {ch.name}
                        </span>
                        <span className={`loop-node ${NODE[i]}`}>
                          <span className="loop-ping" aria-hidden="true" />
                          <ChannelIcon kind={ch.key} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Hub */}
                  <div className="loop-at loop-hub" style={at(hub.x, hub.y)}>
                    <span className="loop-ring" aria-hidden="true" />
                    <span className="loop-core">
                      <SmileyBall size={26} className="[&_path]:fill-brand" />
                    </span>
                    <span className="loop-hub-label">{c.centre}</span>
                  </div>

                  {/* Output */}
                  <div className="loop-at loop-out" style={at(out.x, out.y)}>
                    <span className="loop-out-ping" aria-hidden="true" />
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[#2BB673] text-white">
                      <Calendar size={16} />
                    </span>
                    <span className="whitespace-nowrap text-[15px] font-semibold text-ink">{c.out}</span>
                  </div>
                </div>
              </div>

              <p className="border-t border-line px-6 py-4 text-center text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">{c.foot}</p>
            </div>

            <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] font-medium uppercase tracking-[0.1em] text-muted" aria-label="The steps">
              {d.steps.map((s, i) => (
                <li key={s.key} className="flex items-center gap-2">
                  <span className="rounded-pill border border-line bg-white px-3 py-1 text-ink">{s.name}</span>
                  {i < d.steps.length - 1 && <span aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ChannelIcon({ kind }: { kind: string }) {
  if (kind === "email") return <Mail size={22} />;
  if (kind === "linkedin")
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5H3.6V20h2.9zM5.05 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20.4 13.2c0-3.2-1.7-4.9-4.1-4.9-1.8 0-2.7.9-3.2 1.7V8.5H10.2c0 .8 0 11.5 0 11.5h2.9v-6.4c0-.3 0-.7.1-.9.3-.7.8-1.4 1.9-1.4 1.3 0 1.8 1 1.8 2.5V20h2.9z" />
      </svg>
    );
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 3.5h3l1.6 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}
