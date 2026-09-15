import { Logo } from "./Logo";
import { Container } from "./Container";
import { SmartLink } from "./SmartLink";
import { BookCallLink } from "./BookCallLink";
import { footer, finalCta, hero } from "@/content/site.en";
import { liveServices, servicePath } from "@/content/services";

/**
 * Complete footer: services (from the registry), company, contact, legal
 * (omitted while there are no legal pages), and one closing call to
 * action. The wordmark and the motto close the page the way it opened.
 */
export function Footer() {
  const heading = "mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted";
  const link = "text-small text-fg/80 hover:text-fg";
  return (
    <footer className="border-t border-border bg-bg py-compact">
      <Container>
        <div className="flex flex-col gap-6 rounded-card border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-h3 text-fg">{footer.cta.heading}</p>
            <p className="mt-1.5 max-w-lead text-body text-muted">{footer.cta.body}</p>
          </div>
          <BookCallLink location="footer" variant="primary" magnetic className="w-full shrink-0 md:w-auto" />
        </div>

        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-xl font-bold leading-[1.05] tracking-tight text-[color:var(--flowa-text)]">
              {hero.h1[0]}
              <br />
              <span className="text-accent-display">{hero.h1[1]}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 md:gap-x-14 lg:gap-x-20">
            <div>
              <p className={heading}>{footer.servicesHeading}</p>
              <ul className="space-y-2">
                {liveServices.map((s) => (
                  <li key={s.slug}>
                    <SmartLink href={servicePath(s.slug)} className={link}>
                      {s.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={heading}>{footer.companyHeading}</p>
              <ul className="space-y-2">
                {footer.company.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className={link}>
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={heading}>{footer.contactHeading}</p>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:${finalCta.email}`} className={link}>
                    {finalCta.email}
                  </a>
                </li>
                {footer.linkedinUrl && (
                  <li>
                    <a href={footer.linkedinUrl} target="_blank" rel="noreferrer" className={link}>
                      {finalCta.linkedin}
                    </a>
                  </li>
                )}
              </ul>
              {footer.legal.length > 0 && (
                <>
                  <p className={`${heading} mt-7`}>{footer.legalHeading}</p>
                  <ul className="space-y-2">
                    {footer.legal.map((l) => (
                      <li key={l.label}>
                        <SmartLink href={l.href} className={link}>
                          {l.label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-5 text-[12px] text-muted md:mt-10 md:pt-6">
          <p>
            © {new Date().getFullYear()} Flowa. {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
