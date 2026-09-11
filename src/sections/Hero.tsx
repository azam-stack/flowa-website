import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { PipelineVisual } from "./PipelineVisual";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <SectionLabel>B2B mødebooking · No cure, no pay</SectionLabel>
            <h1 className="mt-5 max-w-xl text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl">
              Vi booker møder.
              <br />
              Der skaber muligheder.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Flowa fylder jeres kalender med kvalificerede salgsmøder hos de rigtige beslutningstagere — så jeres
              salgsteam kan bruge tiden på samtaler og lukning, ikke på at finde dem.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href="#kontakt" variant="accent">
                Book et kald
              </LinkButton>
              <LinkButton href="#sadan-fungerer-det" variant="ghost">
                Se hvordan det fungerer
              </LinkButton>
            </div>
            <p className="mt-8 text-sm text-muted">Ingen binding · I betaler kun for møder, der lever op til jeres kriterier</p>
          </div>

          <PipelineVisual />
        </div>
      </Container>
    </section>
  );
}
