import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const FAQS = [
  {
    q: "Hvordan fungerer no cure no pay?",
    a: "I betaler udelukkende for møder, der lever op til de kriterier, vi aftaler på forhånd — ingen møder, ingen regning. Der er ikke betaling for leads, opkald eller aktivitet.",
  },
  {
    q: "Hvad definerer I som et kvalificeret møde?",
    a: "Det aftaler vi konkret med jer, inden vi går i gang — typisk ud fra rolle/beslutningskompetence, reel interesse og at virksomheden matcher jeres ICP. Kriterierne skrives ned, så der ikke er tvivl bagefter.",
  },
  {
    q: "Hvem kontakter I?",
    a: "Vi kontakter beslutningstagere hos virksomheder, der matcher den kundeprofil, vi definerer sammen med jer — aldrig en tilfældig eller generisk liste.",
  },
  {
    q: "Hvordan finder I virksomhederne?",
    a: "Gennem struktureret research målrettet jeres ICP: branche, størrelse, geografi og andre kriterier, I definerer med os.",
  },
  {
    q: "Hvilke brancher arbejder I med?",
    a: "Primært B2B-virksomheder inden for SaaS, professionelle services, IT/software, marketing og konsulentbranchen — men vi vurderer altid den konkrete sag.",
  },
  {
    q: "Hvor hurtigt kan vi komme i gang?",
    a: "Efter et indledende kald aftaler vi strategi og ICP, hvorefter opstart typisk kan ske inden for kort tid. Præcis tidsramme afhænger af jeres branche og kompleksitet.",
  },
  {
    q: "Hvad hvis et møde bliver aflyst?",
    a: "[Placeholder — indsæt Flowas konkrete politik for aflyste/omlagte møder her.]",
  },
  {
    q: "Er der binding?",
    a: "[Placeholder — indsæt Flowas konkrete opsigelsesvilkår her.]",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>Spørgsmål</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            Ofte stillede spørgsmål
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-[17px] font-semibold text-fg">{item.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                    />
                  </button>
                  <div
                    className="grid overflow-hidden transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
