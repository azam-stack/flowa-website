import { ArrowRight } from "lucide-react";
import { Container } from "./Container";
import { SmartLink } from "./SmartLink";
import { getService, servicePath } from "@/content/services";

/** Internal links between services and to the how-it-works and cases pages: the information architecture, not a footer. */
export function RelatedServices({ heading, slugs, extra }: { heading: string; slugs: string[]; extra: { label: string; href: string }[] }) {
  const related = slugs.map(getService).filter((s): s is NonNullable<typeof s> => !!s);
  return (
    <section aria-label={heading} className="border-t border-border py-compact">
      <Container>
        <p className="text-eyebrow text-muted">{heading}</p>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => (
            <li key={s.slug}>
              <SmartLink href={servicePath(s.slug)} className="group flex h-full flex-col justify-between rounded-card border border-border bg-card p-5 transition-[border-color,transform] duration-[240ms] ease-flowa hover:-translate-y-0.5 hover:border-fg motion-reduce:transition-none">
                <span>
                  <span className="block text-[15px] font-semibold text-fg">{s.name}</span>
                  <span className="mt-1 block text-[13px] text-muted">{s.tagline}</span>
                </span>
                <ArrowRight size={16} className="mt-4 text-muted transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px] group-hover:text-fg" aria-hidden="true" />
              </SmartLink>
            </li>
          ))}
          {extra.map((e) => (
            <li key={e.href}>
              <SmartLink href={e.href} className="group flex h-full flex-col justify-between rounded-card border border-dashed border-border p-5 transition-[border-color,transform] duration-[240ms] ease-flowa hover:-translate-y-0.5 hover:border-fg motion-reduce:transition-none">
                <span className="text-[15px] font-semibold text-fg">{e.label}</span>
                <ArrowRight size={16} className="mt-4 text-muted transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px] group-hover:text-fg" aria-hidden="true" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
