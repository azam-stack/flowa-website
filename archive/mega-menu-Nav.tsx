import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/content/site.en";
import { useMegaMenu } from "./nav/useMegaMenu";
import { MegaPanel } from "./nav/MegaPanel";
import { ServicesPanel } from "./nav/ServicesPanel";
import { IndustriesPanel } from "./nav/IndustriesPanel";
import { AboutPanel } from "./nav/AboutPanel";
import { MobileDrawer } from "./nav/MobileDrawer";

type MenuKey = "services" | "industries" | "about";
const MENUS: Array<{ key: MenuKey; label: string; align: "left" | "center"; width: string }> = [
  { key: "services", label: nav.links.services, align: "left", width: "w-[720px]" },
  { key: "industries", label: nav.links.industries, align: "left", width: "w-56" },
  { key: "about", label: nav.links.about, align: "left", width: "w-[420px]" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menu = useMegaMenu();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      menu.closeAll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) menu.closeAll();
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function focusFirstItem(key: string) {
    setTimeout(() => {
      const container = containerRefs.current[key];
      const first = container?.querySelector<HTMLElement>('[role="menuitem"]');
      first?.focus();
    }, 0);
  }

  function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>, key: MenuKey) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      menu.openImmediate(key);
      focusFirstItem(key);
    } else if (e.key === "Escape") {
      menu.closeAll();
      triggerRefs.current[key]?.focus();
    }
  }

  function handlePanelKeyDown(e: KeyboardEvent<HTMLLIElement>, key: MenuKey) {
    const container = containerRefs.current[key];
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (e.key === "Escape") {
      e.preventDefault();
      menu.closeAll();
      triggerRefs.current[key]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(currentIndex + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex <= 0) triggerRefs.current[key]?.focus();
      else items[currentIndex - 1]?.focus();
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLLIElement>, key: MenuKey) {
    const next = e.relatedTarget as Node | null;
    if (!next || !containerRefs.current[key]?.contains(next)) {
      menu.scheduleClose();
    }
  }

  const renderPanel = (key: MenuKey, align: "left" | "center", width: string) => {
    const onNavigate = () => menu.closeAll();
    return (
      <MegaPanel id={`panel-${key}`} open={menu.isOpen(key)} rendered={menu.isRendered(key)} onMouseEnter={() => menu.scheduleOpen(key)} onMouseLeave={menu.scheduleClose} align={align} width={width}>
        {key === "services" && <ServicesPanel open={menu.isOpen(key)} onNavigate={onNavigate} />}
        {key === "industries" && <IndustriesPanel open={menu.isOpen(key)} onNavigate={onNavigate} />}
        {key === "about" && <AboutPanel open={menu.isOpen(key)} onNavigate={onNavigate} />}
      </MegaPanel>
    );
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled ? "border-b border-black/[0.06] bg-white/[0.82] backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className={`mx-auto flex max-w-content items-center justify-between px-6 transition-[height] duration-200 md:px-10 ${scrolled ? "h-[68px]" : "h-[88px]"}`}>
          <a href="#top" className="shrink-0" onClick={() => menu.closeAll()}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {MENUS.map(({ key, label, align, width }) => (
              <li
                key={key}
                ref={(el) => (containerRefs.current[key] = el)}
                className="relative"
                onMouseEnter={() => menu.scheduleOpen(key)}
                onMouseLeave={menu.scheduleClose}
                onKeyDown={(e) => handlePanelKeyDown(e, key)}
                onBlur={(e) => handleBlur(e, key)}
              >
                <button
                  ref={(el) => (triggerRefs.current[key] = el)}
                  aria-expanded={menu.isOpen(key)}
                  aria-controls={`panel-${key}`}
                  onClick={() => (menu.isOpen(key) ? menu.closeAll() : menu.openImmediate(key))}
                  onKeyDown={(e) => handleTriggerKeyDown(e, key)}
                  className={`group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    menu.isOpen(key) ? "text-fg" : "text-fg/75 hover:text-fg"
                  }`}
                >
                  {label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${menu.isOpen(key) ? "rotate-180" : ""}`} />
                  <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] origin-left bg-accent transition-transform duration-[160ms] ${menu.isOpen(key) ? "scale-x-100" : "scale-x-0"}`} />
                </button>
                {renderPanel(key, align, width)}
              </li>
            ))}
            <li>
              <a href="#pricing" onClick={() => menu.closeAll()} className="rounded-lg px-3.5 py-2 text-sm font-medium text-fg/75 transition-colors hover:text-fg">
                {nav.links.pricing}
              </a>
            </li>
          </ul>

          <div className="hidden lg:block">
            <LinkButton href="#contact" variant="accent" className="px-5 py-2.5 text-sm">
              {nav.bookCall}
            </LinkButton>
          </div>

          <button aria-label={mobileOpen ? "Close menu" : "Open menu"} className="flex items-center justify-center rounded-full p-2 text-fg lg:hidden" onClick={() => setMobileOpen((v) => !v)}>
            <span className="relative block h-5 w-5">
              <Menu size={20} className={`absolute inset-0 transition-all duration-200 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-200 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </span>
          </button>
        </nav>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
