import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/content/site.en";
import { MobileDrawer } from "./nav/MobileDrawer";

/**
 * Anchor navigation for a one-page site: every link lands on a section
 * that exists. The active section is underlined as you scroll, and the
 * "Book a call" button turns orange only once the hero's own call to
 * action has scrolled out of view — one orange button at a time.
 *
 * The mega-menu (src/components/nav/MegaPanel etc.) is kept in the repo,
 * unmounted, for when there are real sub-pages to point at.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;
    const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = nav.anchors.map((a) => document.getElementById(a.sectionId)).filter((el): el is HTMLElement => el !== null);
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
        setActiveId(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        {nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled ? "border-b border-border bg-bg/[0.86] backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-content items-center justify-between px-6 transition-[height] duration-200 md:px-10 ${scrolled ? "h-[68px]" : "h-[88px]"}`}
        >
          <a href="#top" className="shrink-0" aria-label="Flowa — back to top">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.anchors.map((item) => {
              const active = activeId === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    className={`relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${active ? "text-fg" : "text-fg/70 hover:text-fg"}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] origin-left bg-accent transition-transform duration-200 ease-out motion-reduce:transition-none ${active ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <LinkButton href="#contact" variant={heroCtaVisible ? "ghost" : "accent"} size="sm">
              {nav.bookCall}
            </LinkButton>
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
