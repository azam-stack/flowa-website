import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { BookCallLink } from "./BookCallLink";
import { SmartLink } from "./SmartLink";
import { nav } from "@/content/site.en";
import { MobileDrawer } from "./nav/MobileDrawer";
import { useMegaMenu } from "./nav/useMegaMenu";
import { MegaPanel } from "./nav/MegaPanel";
import { ServicesMenu } from "./nav/ServicesMenu";

/**
 * Primary navigation. Services opens a mega-menu (hover intent, keyboard
 * arrows, Escape); the other items are routes or sections. One underline
 * glides to the active item: the current route, or on the home page the
 * section in view. The "Book a call" button turns orange only once the
 * hero's own call to action has scrolled away, so one orange button is
 * in view at a time.
 */
export function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesItemRef = useRef<HTMLLIElement>(null);
  const menu = useMegaMenu();
  const [underline, setUnderline] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });

  const isHome = location.pathname === "/";

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
    menu.closeAll();
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) menu.closeAll();
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The hero CTA exists on every page; while it is on screen the nav button stays quiet.
  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) {
      setHeroCtaVisible(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, [location.pathname]);

  // On the home page, the section in view decides the active item.
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const ids = nav.primary.filter((i) => i.href.startsWith("/#")).map((i) => i.href.slice(2));
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveSection(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const activeKey = (() => {
    for (const item of nav.primary) {
      if (item.href.startsWith("/#")) {
        if (isHome && activeSection === item.href.slice(2)) return item.key;
      } else if (location.pathname === item.href || location.pathname.startsWith(item.href + "/")) return item.key;
    }
    return null;
  })();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const el = activeKey ? list.querySelector<HTMLElement>(`[data-key="${activeKey}"]`) : null;
      if (!el) {
        setUnderline((u) => ({ ...u, visible: false }));
        return;
      }
      setUnderline({ left: el.offsetLeft + 14, width: Math.max(0, el.offsetWidth - 28), visible: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeKey]);

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      menu.openImmediate("services");
      setTimeout(() => servicesItemRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus(), 0);
    } else if (e.key === "Escape") {
      menu.closeAll();
    }
  }

  function onPanelKeyDown(e: KeyboardEvent<HTMLLIElement>) {
    const container = servicesItemRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const current = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape") {
      e.preventDefault();
      menu.closeAll();
      servicesTriggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(current + 1, items.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (current <= 0) servicesTriggerRef.current?.focus();
      else items[current - 1]?.focus();
    }
  }

  const linkCls = (active: boolean) => `block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-fg/[0.04] ${active ? "text-fg" : "text-fg/70 hover:text-fg"}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg">
        {nav.skipToContent}
      </a>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled || menu.activeKey ? "border-b border-border bg-bg/[0.86] backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className={`mx-auto flex max-w-content items-center justify-between px-6 transition-[height] duration-200 md:px-10 ${scrolled ? "h-[68px]" : "h-[88px]"}`}>
          <Link to="/" className="shrink-0 transition-transform duration-[240ms] ease-flowa hover:-translate-y-px motion-reduce:transition-none" aria-label="Flowa — home" onClick={() => menu.closeAll()}>
            <Logo />
          </Link>

          <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            {nav.primary.map((item) => {
              const active = activeKey === item.key;
              if ("menu" in item && item.menu) {
                const open = menu.isOpen(item.key);
                return (
                  <li key={item.key} ref={servicesItemRef} className="relative" onMouseEnter={() => menu.scheduleOpen(item.key)} onMouseLeave={menu.scheduleClose} onKeyDown={onPanelKeyDown}>
                    <button
                      ref={servicesTriggerRef}
                      type="button"
                      data-key={item.key}
                      aria-expanded={open}
                      aria-controls="panel-services"
                      aria-current={active ? "page" : undefined}
                      onClick={() => (open ? menu.closeAll() : menu.openImmediate(item.key))}
                      onKeyDown={onTriggerKeyDown}
                      className={`${linkCls(active || open)} flex items-center gap-1.5`}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    <MegaPanel id="panel-services" open={open} rendered={menu.isRendered(item.key)} onMouseEnter={() => menu.scheduleOpen(item.key)} onMouseLeave={menu.scheduleClose} align="left" width="w-[760px]">
                      <ServicesMenu open={open} onNavigate={() => menu.closeAll()} />
                    </MegaPanel>
                  </li>
                );
              }
              return (
                <li key={item.key}>
                  <SmartLink href={item.href} data-key={item.key} aria-current={active ? "page" : undefined} className={linkCls(active)} onClick={() => menu.closeAll()}>
                    {item.label}
                  </SmartLink>
                </li>
              );
            })}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0.5 h-[2px] bg-accent transition-[left,width,opacity] duration-200 ease-out motion-reduce:transition-none"
              style={{ left: underline.left, width: underline.width, opacity: underline.visible ? 1 : 0 }}
            />
          </ul>

          <div className="hidden lg:block">
            <BookCallLink location="nav" variant={heroCtaVisible ? "ghost" : "accent"} size="sm" className="duration-[240ms]" />
          </div>

          <button
            ref={menuButtonRef}
            aria-label={mobileOpen ? nav.menuClose : nav.menuOpen}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-fg lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-5 w-5">
              <Menu size={20} className={`absolute inset-0 transition-all duration-200 motion-reduce:transition-none ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-200 motion-reduce:transition-none ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </span>
          </button>
        </nav>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} returnFocusTo={menuButtonRef} />
    </>
  );
}
