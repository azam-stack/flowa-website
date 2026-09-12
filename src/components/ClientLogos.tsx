import { clients } from "@/content/site.en";

/**
 * C1 of the restructure brief: no client logo strip until real clients
 * exist — not a placeholder, not greyed-out boxes, not a "coming soon"
 * caption. Driven entirely by `content.clients`; renders nothing while
 * that array is empty. Kept in the codebase per C1 even though it isn't
 * mounted on the homepage while `clients` is empty.
 */
export function ClientLogos() {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-border py-8">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 md:px-10">
        {clients.map((c) => (
          <img key={c.name} src={c.logoSrc} alt={c.name} className="h-6 w-auto grayscale" />
        ))}
      </div>
    </section>
  );
}
