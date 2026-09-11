import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const ITEMS = [
  {
    n: "01",
    title: "De rigtige virksomheder",
    body: "Vi definerer jeres ideelle kundeprofil sammen med jer og målretter research derefter — ikke bredt, men rigtigt.",
  },
  {
    n: "02",
    title: "De rigtige beslutningstagere",
    body: "Vi finder frem til dem, der reelt kan sige ja — ikke bare en generisk kontakt på virksomhedens hjemmeside.",
  },
  {
    n: "03",
    title: "Kvalificerede samtaler",
    body: "Vi taler med prospects direkte og professionelt, og filtrerer fra, når interessen eller behovet ikke er reelt.",
  },
  {
    n: "04",
    title: "Møder i kalenderen",
    body: "Kun møder, der lever op til jeres kriterier, ender i kalenderen — klar til at I tager over.",
  },
];

export function ValueProps() {
  return (
    <section id="hvem-er-vi" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>Hvorfor Flowa</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            Din salgsafdeling skal ikke bruge tiden på at finde møder.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
            Flowa tager sig af research og mødebooking, så jeres team kan bruge tiden på det, der rent faktisk lukker
            aftaler.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <div className="group h-full bg-card p-7 transition-colors duration-300 hover:bg-fg hover:text-bg">
                <span className="text-sm font-bold text-accent">{item.n}</span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-bg/70">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
