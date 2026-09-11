import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

const SLOTS = 5;

export function TrustBar() {
  return (
    <section className="border-y border-border py-10">
      <Container>
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Bygget til ambitiøse B2B-virksomheder
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: SLOTS }).map((_, i) => (
              <div
                key={i}
                className="flex h-14 w-36 items-center justify-center rounded-xl border border-dashed border-border text-xs font-medium text-muted/70"
              >
                Kundelogo
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
