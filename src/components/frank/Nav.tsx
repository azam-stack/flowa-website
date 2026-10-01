import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";
import { SITE_CONFIG } from "@/config/site";
import { nav, type MenuGroup, type MenuItem } from "@/content/frank/chrome";
import { track } from "@/lib/analytics";
import { Btn } from "./Btn";
import { ChevronDown, Close, Document, Mail, Menu, Message, People, Pulse, Question, Steps } from "./Icons";
import { FrankAvatar } from "./FrankAvatar";

/**
 * Sticky navigation under the announcement bar (brief §3.2): page-bg,
 * 1px ink bottom border, the Flowa logo, Product / Resources / Company
 * dropdowns (white cards, 16px radius, hairline border, icon + title +
 * one-line description), a Pricing link, the Client dashboard link
 * (rendered only when a URL is configured) and the black "Book a call".
 * Mobile: hamburger to a full-screen sheet with accordion sub-menus and
 * "Book a call" pinned at the bottom.
 */
function ItemIcon({ icon }: { icon: MenuItem["icon"] }) {
  const cls = "h-10 w-10 flex-none grid place-items-center rounded-full bg-panel text-ink";
  if (icon === "frank") return <FrankAvatar decorative round className="h-10 w-10 flex-none" />;
  const I = { steps: Steps, signals: Pulse, mail: Mail, linkedin: Message, cases: Document, faq: Question, about: People, contact: Mail }[icon];
  return (
    <span className={cls}>
      <I size={18} />
    </span>
  );
}

function MenuLink({ item, onNavigate, compact = false }: { item: MenuItem; onNavigate: () => void; compact?: boolean }) {
  return (
    <SmartLink href={item.href} role="menuitem" onClick={() => { track("nav_click", { label: item.title }); onNavigate(); }} className={`flex items-start gap-3 rounded-[12px] px-3 py-2.5 transition-colors hover:bg-soft ${compact ? "" : ""}`}>
      <ItemIcon icon={item.icon} />
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-ink">{item.title}</span>
        <span className="block text-[13px] leading-snug text-muted">{item.description}</span>
      </span>
    </SmartLink>
  );
}

function Dropdown({ group, open, onOpen, onClose, active }: { group: MenuGroup; open: boolean; onOpen: () => void; onClose: () => void; active: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose]);
  return (
    <div ref={ref} className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={id}
        onClick={open ? onClose : onOpen}
        className={`flex h-10 items-center gap-1 rounded-control px-3 text-[15px] font-medium transition-colors hover:text-ink ${active ? "text-ink underline decoration-brand decoration-2 underline-offset-[10px]" : "text-ink-2"}`}
      >
        {group.label}
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={id} role="menu" aria-label={group.label} className="rise-in absolute left-0 top-full z-50 w-[360px] pt-2">
          <div className="rounded-card border border-line bg-white p-2 shadow-float">
            {group.items.map((item) => (
              <MenuLink key={item.href} item={item} onNavigate={onClose} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSheet({ open, onClose, closeRef }: { open: boolean; onClose: () => void; closeRef: React.RefObject<HTMLButtonElement> }) {
  const [expanded, setExpanded] = useState<string | null>(nav.groups[0].key);
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
        {nav.groups.map((g) => {
          const isOpen = expanded === g.key;
          return (
            <div key={g.key} className="border-b border-line">
              <button type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : g.key)} className="flex w-full items-center justify-between py-4 text-left text-[18px] font-medium text-ink">
                {g.label}
                <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="-mx-3 pb-3">
                  {g.items.map((item) => (
                    <MenuLink key={item.href} item={item} onNavigate={onClose} compact />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <SmartLink href={nav.pricing.href} onClick={onClose} className={`block border-b border-line py-4 text-[18px] font-medium text-ink ${pathname === nav.pricing.href ? "underline decoration-brand decoration-2 underline-offset-8" : ""}`}>
          {nav.pricing.label}
        </SmartLink>
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // A new page closes everything.
  useEffect(() => {
    setOpenGroup(null);
    setSheet(false);
  }, [pathname]);

  const closeSheet = () => {
    setSheet(false);
    burgerRef.current?.focus();
  };

  const isActive = (g: MenuGroup) => g.items.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));

  const right: ReactNode = (
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
  );

  return (
    <nav aria-label="Main" className="border-b border-ink bg-page">
      <div className="mx-auto flex h-[72px] w-full max-w-container items-center justify-between gap-6 px-4 md:px-10 xl:px-gutter">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Flowa home" className="flex items-center rounded-control">
            <Logo />
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {nav.groups.map((g) => (
              <Dropdown key={g.key} group={g} open={openGroup === g.key} onOpen={() => setOpenGroup(g.key)} onClose={() => setOpenGroup((o) => (o === g.key ? null : o))} active={isActive(g)} />
            ))}
            <SmartLink href={nav.pricing.href} className={`flex h-10 items-center rounded-control px-3 text-[15px] font-medium transition-colors hover:text-ink ${pathname === nav.pricing.href ? "text-ink underline decoration-brand decoration-2 underline-offset-[10px]" : "text-ink-2"}`}>
              {nav.pricing.label}
            </SmartLink>
          </div>
        </div>
        {right}
      </div>
      <MobileSheet open={sheet} onClose={closeSheet} closeRef={closeRef} />
    </nav>
  );
}
