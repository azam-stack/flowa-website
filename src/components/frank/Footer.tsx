import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";
import { footer } from "@/content/frank/chrome";

/** Footer: surface-soft, ink top border, logo + tagline + email, four link columns, the bottom line. Brief §3.5. */
export function Footer() {
  return (
    <footer className="border-t border-ink bg-soft">
      <div className="mx-auto w-full max-w-container px-4 py-14 md:px-10 md:py-16 xl:px-gutter">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Link to="/" aria-label="Flowa home" className="inline-flex rounded-control">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-[17px] font-medium leading-snug text-ink">{footer.tagline}</p>
            <a href={`mailto:${footer.email}`} className="mt-3 inline-block text-[15px] text-brand-deep underline decoration-brand/50 underline-offset-4 hover:decoration-brand-deep">
              {footer.email}
            </a>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted">{col.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <SmartLink href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink hover:underline hover:underline-offset-4">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-[13px] text-muted md:mt-14">
          <p>{footer.bottom}</p>
        </div>
      </div>
    </footer>
  );
}
