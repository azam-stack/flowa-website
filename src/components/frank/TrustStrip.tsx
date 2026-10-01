import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { TrustVignette } from "./Vignettes";

/** Trust strip above the footer (brief §4.14): the H3 and line on the left, a shield with a Flowa "o" on the right. No badges until they are earned. */
export function TrustStrip() {
  const t = home.trust;
  return (
    <section className="pb-section-m lg:pb-section" aria-label={t.h3}>
      <Container>
        <Reveal className="framed grid items-center gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:px-12 md:py-10">
          <div>
            <h3 className="text-h3 text-ink">{t.h3}</h3>
            <p className="mt-2 max-w-lead text-body text-ink-2">{t.body}</p>
          </div>
          <div className="mx-auto md:mx-0">
            <TrustVignette />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
