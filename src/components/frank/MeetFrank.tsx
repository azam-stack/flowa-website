import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { FrankCard } from "./FrankCard";
import { CalendarMock, DraftMock, ScanMock } from "./Mocks";
import { SectionHeading, Section } from "./SectionHeading";

const MOCK = { finds: ScanMock, writes: DraftMock, books: CalendarMock } as const;

/**
 * The three "Meet Frank" rows (copy v2: finds, writes, books): alternating framed cards,
 * each with a small Frank card, a serif title, a bold sub, the body and a
 * large dark mock-up. On mobile the Frank card stacks above the mock-up.
 * Reused on /frank.
 */
export function MeetFrankRows() {
  return (
    <>
    <div className="flex flex-col gap-6 md:gap-8">
      {home.meet.rows.map((row, i) => {
        const Mock = MOCK[row.key];
        const frankRight = row.frankSide === "right";
        return (
          <Reveal key={row.key} delay={i * 40} className="framed grid gap-6 p-4 shadow-float md:grid-cols-2 md:gap-10 md:p-8 lg:p-10">
            <div className={`flex min-w-0 flex-col gap-6 md:flex-row md:items-start md:gap-8 ${frankRight ? "md:order-2" : ""}`}>
              <FrankCard pose={row.pose} decorative className="w-[200px] flex-none md:w-[220px]" />
              <div className="md:pt-2">
                <p className="text-[13px] font-semibold tracking-wide text-brand-deep">0{i + 1}</p>
                <h3 className="serif mt-1 text-[32px] leading-tight text-ink md:text-[36px]">{row.title}</h3>
                <p className="mt-3 text-[18px] font-semibold text-ink">{row.sub}</p>
                <p className="mt-3 text-body text-ink-2">{row.body}</p>
              </div>
            </div>
            <div className={`min-w-0 ${frankRight ? "md:order-1" : ""}`}>
              <Mock className="h-full" />
            </div>
          </Reveal>
        );
      })}
    </div>
    <p className="mt-6 text-center text-small text-muted md:mt-8">{home.meet.caption}</p>
    </>
  );
}

export function MeetFrank() {
  const m = home.meet;
  return (
    <Section id="meet-frank">
      <Container>
        <SectionHeading eyebrow={m.eyebrow} title={m.h2} sub={m.sub} />
        <div className="mt-12 md:mt-16">
          <MeetFrankRows />
        </div>
      </Container>
    </Section>
  );
}
