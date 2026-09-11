import { Logo } from "./Logo";
import { Container } from "./Container";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#hvem-er-vi", label: "Hvem er vi" },
  { href: "#cases", label: "Cases" },
  { href: "#kontakt", label: "Book et kald" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-muted">"Vi booker møder. Der skaber muligheder."</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">Navigation</p>
              <ul className="space-y-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-fg/80 hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">Kontakt</p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:flowameetings@gmail.com" className="text-sm text-fg/80 hover:text-fg">
                    flowameetings@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-sm text-fg/80 hover:text-fg">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flowa. Alle rettigheder forbeholdes.</p>
        </div>
      </Container>
    </footer>
  );
}
