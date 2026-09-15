import { useEffect, useRef, type RefObject } from "react";
import { nav } from "@/content/site.en";
import { LinkButton } from "../Button";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Off-canvas sheet: traps focus while open, closes on Escape and on the
 * backdrop, locks body scroll, and returns focus to the button that
 * opened it. Five links and one call to action — no accordions, because
 * every destination is a section on this page.
 */
export function MobileDrawer({ open, onClose, returnFocusTo }: { open: boolean; onClose: () => void; returnFocusTo: RefObject<HTMLButtonElement> }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusTo.current?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-fg/30 transition-opacity duration-200 motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bg shadow-2xl transition-transform duration-[240ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-24">
          <ul className="flex flex-col">
            {nav.anchors.map((item, i) => (
              <li key={item.href} className="border-b border-border">
                <a
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className={`block py-4 text-lg font-semibold text-fg transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                  style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-6">
          <LinkButton href="#contact" variant="accent" size="lg" className="w-full" onClick={onClose} tabIndex={open ? 0 : -1}>
            {nav.bookCall}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
