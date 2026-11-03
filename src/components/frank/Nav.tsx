import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";
import { SITE_CONFIG } from "@/config/site";
import { nav } from "@/content/frank/chrome";
import { track } from "@/lib/analytics";
import { Btn } from "./Btn";
import { Close, Menu } from "./Icons";

/**
 * Sticky navigation: logo, four flat links, "Book a call". No dropdowns;
 * the long tail of pages lives in the footer. Mobile: hamburger to a
 * full-screen sheet with the same links and "Book a call" pinned at the
 * bottom.
 */
function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileSheet({ open, onClose, closeRef }: { open: boolean; onClose: () => void; closeRef: React.RefObject<HTMLButtonElement> }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, closeRef]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[70] flex flex-col bg-page lg:hidden">
      <div className="flex h-[72px] flex-none items-center justify-between border-b border-ink px-4">
        <Link to="/" onClick={onClose} aria-label="Flowa home">
          <Logo />
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={nav.menuClose} className="grid h-11 w-11 place-items-center rounded-control">
          <Close size={24} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Site">
        {nav.links.map((l) => (
          <SmartLink key={l.href} href={l.href} onClick={() => { track("nav_click", { label: l.label }); onClose(); }} className={`block border-b border-line py-4 text-[18px] font-medium text-ink ${active(pathname, l.href) ? "underline decoration-brand decoration-2 underline-offset-8" : ""}`}>
            {l.label}
          </SmartLink>
        ))}
        {SITE_CONFIG.clientDashboardUrl && (
          <a href={SITE_CONFIG.clientDashboardUrl} target="_blank" rel="noopener noreferrer" className="block border-b border-line py-4 text-[18px] font-medium text-ink">
            {nav.clientDashboard.label}
          </a>
        )}
      </nav>
      <div className="flex-none border-t border-ink bg-page p-4">
        <Btn href={nav.demo.href} size="lg" className="w-full" trackLabel="nav_book_demo" onClick={onClose}>
          {nav.demo.label}
        </Btn>
      </div>
    </div>
  );
}

export function Nav() {
  const [sheet, setSheet] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setSheet(false);
  }, [pathname]);

  const closeSheet = () => {
    setSheet(false);
    burgerRef.current?.focus();
  };

  return (
    <nav aria-label="Main" className="border-b border-ink bg-page/95 backdrop-blur-md supports-[backdrop-filter]:bg-page/85">
      <div className="mx-auto flex h-[72px] w-full max-w-container items-center justify-between gap-6 px-4 md:px-10 xl:px-gutter">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Flowa home" className="flex items-center rounded-control">
            <Logo />
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {nav.links.map((l) => (
              <SmartLink key={l.href} href={l.href} onClick={() => track("nav_click", { label: l.label })} className={`flex h-10 items-center rounded-control px-3 text-[15px] font-medium transition-colors hover:text-ink ${active(pathname, l.href) ? "text-ink underline decoration-brand decoration-2 underline-offset-[10px]" : "text-ink-2"}`}>
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {SITE_CONFIG.clientDashboardUrl && (
            <a href={SITE_CONFIG.clientDashboardUrl} target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center rounded-control px-3 text-[15px] font-medium text-ink-2 hover:text-ink lg:flex">
              {nav.clientDashboard.label}
            </a>
          )}
          <Btn href={nav.demo.href} size="sm" className="hidden lg:inline-flex" trackLabel="nav_book_demo">
            {nav.demo.label}
          </Btn>
          <button ref={burgerRef} type="button" onClick={() => setSheet(true)} aria-label={nav.menuOpen} aria-expanded={sheet} className="grid h-11 w-11 place-items-center rounded-control lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <MobileSheet open={sheet} onClose={closeSheet} closeRef={closeRef} />
    </nav>
  );
}
