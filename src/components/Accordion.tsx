import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  title: string;
  body: string;
}

/**
 * Single-open accordion with proper button/region semantics. Used by the
 * FAQ; anything else that folds should use this rather than its own
 * grid-rows implementation.
 */
export function Accordion({ items, defaultOpen = null, className = "" }: { items: readonly AccordionItem[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={`divide-y divide-border border-y border-border ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-b-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.title}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-[17px] font-semibold text-fg">{item.title}</span>
                <ChevronDown size={20} className={`shrink-0 transition-transform duration-[280ms] ease-flowa motion-reduce:transition-none ${isOpen ? "rotate-180 text-accent" : "text-muted"}`} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid overflow-hidden transition-[grid-template-rows] duration-[280ms] ease-flowa motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-5 text-body text-muted">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
