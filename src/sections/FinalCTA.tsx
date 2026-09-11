import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-ink py-24 text-ink-fg md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Klar til flere relevante salgssamtaler?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            Lad os tale om jeres målgruppe, ideelle kunder og mål for antal møder — helt uforpligtende.
          </p>
          <div className="mt-9 flex justify-center">
            <LinkButton href="#kontakt" variant="accent">
              Book et kald
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
