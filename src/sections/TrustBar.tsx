import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { trust } from "@/content/site.en";

/** No verified client logos exist yet — per brief, we never ship fake or
 * placeholder logo boxes. A single, founder-verifiable credential line
 * stands in until real logos are cleared for use. */
export function TrustBar() {
  return (
    <section className="border-y border-border py-8">
      <Container>
        <Reveal>
          <p className="text-center text-sm text-muted">{trust.credential}</p>
        </Reveal>
      </Container>
    </section>
  );
}
