import { useId, useState } from "react";
import { SmartLink } from "@/components/SmartLink";
import { track } from "@/lib/analytics";
import { ArrowRight, PlusIcon } from "./Icons";

export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

/** FAQ accordion (brief §4.13): white cards, the + icon rotates to × when open. One open at a time. */
export function FaqList({ items, defaultOpen = null, className = "" }: { items: readonly FaqItem[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const b = `${base}-b-${i}`;
        const p = `${base}-p-${i}`;
        return (
          <div key={item.q} className="rounded-card border border-line bg-white">
            <h3 className="m-0">
              <button
                id={b}
                type="button"
                aria-expanded={isOpen}
                aria-controls={p}
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  if (!isOpen) track("faq_open", { question: item.q });
                }}
                className="flex w-full items-center justify-between gap-4 rounded-card px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span className="text-[16px] font-medium text-ink md:text-[17px]">{item.q}</span>
                <span className={`grid h-8 w-8 flex-none place-items-center rounded-full border border-ink text-ink transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                  <PlusIcon size={16} />
                </span>
              </button>
            </h3>
            <div id={p} role="region" aria-labelledby={b} className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="max-w-prose px-5 pb-5 text-body text-ink-2 md:px-6">{item.a}</p>
                {item.link && (
                  <SmartLink href={item.link.href} className="group -mt-2 mb-5 ml-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-deep md:ml-6">
                    {item.link.label}
                    <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </SmartLink>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
