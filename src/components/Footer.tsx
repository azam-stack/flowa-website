import { Logo } from "./Logo";
import { Container } from "./Container";
import { FluidObject } from "./FluidObject";
import { nav, footer, finalCta, hero } from "@/content/site.en";

const LINKS = [...nav.anchors.map((a) => ({ href: a.href, label: a.label })), { href: "#contact", label: nav.bookCall }];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-compact">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex max-w-sm items-start gap-5">
            <div className="-ml-3 -mt-3 h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-hidden="true">
              <FluidObject still frame={16} className="h-full w-full" />
            </div>
            <div>
            <Logo />
            <p className="mt-4 text-xl font-bold leading-[1.05] tracking-tight text-[color:var(--flowa-text)]">
              {hero.h1[0]}
              <br />
              <span className="text-accent-display">{hero.h1[1]}</span>
            </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">{footer.navigationHeading}</p>
              <ul className="space-y-1.5 md:space-y-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-small text-fg/80 hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">{footer.contactHeading}</p>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:${finalCta.email}`} className="text-small text-fg/80 hover:text-fg">
                    {finalCta.email}
                  </a>
                </li>
                {footer.linkedinUrl && (
                  <li>
                    <a href={footer.linkedinUrl} target="_blank" rel="noreferrer" className="text-small text-fg/80 hover:text-fg">
                      {finalCta.linkedin}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5 text-[12px] text-muted md:mt-8 md:pt-6">
          <p>
            © {new Date().getFullYear()} Flowa. {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
