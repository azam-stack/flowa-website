import { useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/content/site.en";

export function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ down: boolean; startX: number; startScroll: number }>({ down: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-case-card]");
    const amount = (card?.offsetWidth ?? 380) + 24;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft };
    setDragging(true);
    track.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !dragState.current.down) return;
    track.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  }
  function endDrag() {
    dragState.current.down = false;
    setDragging(false);
  }

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>{caseStudies.eyebrow}</SectionLabel>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{caseStudies.h2}</h2>
            </div>
            <div className="flex items-center gap-3">
              <p className="hidden max-w-[22ch] text-sm text-muted md:block">{caseStudies.note}</p>
              <div className="flex gap-2">
                <button onClick={() => scrollByCard(-1)} aria-label="Previous case study" className="rounded-full border border-border p-2.5 text-fg transition-colors hover:border-fg">
                  <ArrowLeft size={16} />
                </button>
                <button onClick={() => scrollByCard(1)} aria-label="Next case study" className="rounded-full border border-border p-2.5 text-fg transition-colors hover:border-fg">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted md:hidden">{caseStudies.note}</p>
        </Reveal>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        >
          {caseStudies.items.map((c, i) => (
            <div key={i} data-case-card className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-fg">{c.client}</span>
                  <span className="rounded-full bg-fg/5 px-3 py-1 text-xs font-medium text-muted">{c.industry}</span>
                </div>
                <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-fg">&ldquo;{c.quote}&rdquo;</p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-3xl font-extrabold tracking-tight text-accent">{m.value}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                  {caseStudies.readMore}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
