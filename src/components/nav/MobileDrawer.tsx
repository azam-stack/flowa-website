import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { nav } from "@/content/site.en";
import { LinkButton } from "../Button";

const SECTIONS = [
  { key: "services", label: nav.links.services, items: [...nav.servicesPanel.core.map((c) => ({ title: c.title, href: c.href })), ...nav.servicesPanel.howWeWork] },
  { key: "industries", label: nav.links.industries, items: nav.industriesPanel },
  { key: "about", label: nav.links.about, items: nav.aboutPanel.company },
];

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-fg/30 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bg shadow-2xl transition-transform duration-[240ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-24">
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((section) => (
              <div key={section.key} className="border-b border-border">
                <button
                  onClick={() => setExpanded((v) => (v === section.key ? null : section.key))}
                  aria-expanded={expanded === section.key}
                  className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-fg"
                >
                  {section.label}
                  <ChevronDown size={18} className={`transition-transform duration-200 ${expanded === section.key ? "rotate-180" : ""}`} />
                </button>
                <div className="grid overflow-hidden transition-all duration-200" style={{ gridTemplateRows: expanded === section.key ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden pb-3">
                    {section.items.map((item) => (
                      <a key={item.title} href={item.href} onClick={onClose} className="block rounded-lg px-2 py-2.5 text-sm text-muted hover:text-fg">
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <a href="#pricing" onClick={onClose} className="border-b border-border py-4 text-base font-semibold text-fg">
              {nav.links.pricing}
            </a>
            <a href="#case-studies" onClick={onClose} className="py-4 text-base font-semibold text-fg">
              {nav.links.caseStudies}
            </a>
          </nav>
        </div>
        <div className="border-t border-border p-6">
          <LinkButton href="#contact" variant="accent" className="w-full" onClick={onClose}>
            {nav.bookCall}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
