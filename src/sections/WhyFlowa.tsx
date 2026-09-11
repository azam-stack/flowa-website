import { Check, Minus } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const ROWS: Array<{ label: string; traditional: string; flowa: string }> = [
  { label: "Volumen", traditional: "Store, ukvalificerede lister", flowa: "Målrettede, relevante lister" },
  { label: "Kvalificering", traditional: "Sjældent eller slet ikke", flowa: "Hvert møde kvalificeres efter aftalte kriterier" },
  { label: "Beslutningstagere", traditional: "Generiske kontakter", flowa: "Relevante beslutningstagere" },
  { label: "Prismodel", traditional: "Betal for aktivitet eller leads", flowa: "No cure, no pay — betal for møder" },
  { label: "Fokus", traditional: "Volumen", flowa: "Kvalitet og relevans" },
  { label: "Gennemsigtighed", traditional: "Begrænset indsigt i processen", flowa: "Fuld indsigt i strategi og fremgang" },
];

export function WhyFlowa() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>Sammenligning</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            Ikke flere leads. Bedre møder.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-1/3 bg-card px-6 py-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">Kategori</th>
                  <th className="bg-card px-6 py-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted">Traditionel leadgenerering</th>
                  <th className="bg-fg px-6 py-5 text-xs font-semibold uppercase tracking-[0.1em] text-accent">Flowa</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-bg"}>
                    <td className="px-6 py-5 text-[15px] font-semibold text-fg">{row.label}</td>
                    <td className="px-6 py-5 text-[15px] text-muted">
                      <span className="flex items-start gap-2">
                        <Minus size={16} className="mt-0.5 shrink-0 text-muted/60" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="bg-fg/[0.03] px-6 py-5 text-[15px] font-medium text-fg">
                      <span className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {row.flowa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
