import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { useSeo } from "@/lib/seo";

export function NotFoundPage() {
  useSeo({ title: "Page not found | Flowa", description: "That page does not exist.", path: "/404" });
  return (
    <section className="pb-24 pt-40">
      <Container>
        <p className="text-eyebrow text-muted">404</p>
        <h1 className="mt-3 text-h2 text-fg">That page doesn't exist.</h1>
        <p className="mt-4 max-w-lead text-lead text-muted">The address may have changed. Everything Flowa does is one click away.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/" variant="primary">
            Home
          </LinkButton>
          <LinkButton href="/services" variant="ghost" arrow>
            Services
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
