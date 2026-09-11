import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#hvem-er-vi", label: "Hvem er vi" },
  { href: "#cases", label: "Cases" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/85 shadow-[0_1px_0_0_theme(colors.border)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-fg/80 transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <LinkButton href="#kontakt" variant="accent" className="px-5 py-2.5 text-sm">
            Book et kald
          </LinkButton>
        </div>

        <button
          aria-label={open ? "Luk menu" : "Åbn menu"}
          className="flex items-center justify-center rounded-full p-2 text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-6 pb-8 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-fg hover:bg-fg/5"
              >
                {l.label}
              </a>
            ))}
          </div>
          <LinkButton href="#kontakt" variant="accent" className="mt-4 w-full" onClick={() => setOpen(false)}>
            Book et kald
          </LinkButton>
        </div>
      )}
    </header>
  );
}
