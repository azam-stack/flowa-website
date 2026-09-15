import { ArrowRight } from "lucide-react";
import { nav } from "@/content/site.en";
import { liveServices, servicePath } from "@/content/services";
import { SmartLink } from "../SmartLink";

/**
 * The Services mega-menu: the service rows (from the registry), the four
 * steps of how Flowa works, and three reasons to choose it. Deliberately
 * one panel and three columns; not a site map.
 */
export function ServicesMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const m = nav.megaMenu;
  const col = (i: number) => ({
    className: `transition-[opacity,transform] duration-[240ms] ease-flowa motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`,
    style: { transitionDelay: open ? `${40 + i * 50}ms` : "0ms" },
  });
  const heading = "mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted";
  return (
    <div className="grid grid-cols-[1.5fr_1fr_1.15fr] gap-8 p-7" role="none">
      <div {...col(0)}>
        <p className={heading}>{m.servicesHeading}</p>
        <ul className="space-y-1">
          {liveServices.map((s) => (
            <li key={s.slug}>
              <SmartLink href={servicePath(s.slug)} onClick={onNavigate} role="menuitem" className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/[0.06] focus-visible:bg-accent/[0.06]">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-fg group-hover:text-accent-hover">
                  {s.name}
                  <ArrowRight size={14} className="opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none" aria-hidden="true" />
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">{s.tagline}</p>
              </SmartLink>
            </li>
          ))}
          <li>
            <SmartLink href="/services" onClick={onNavigate} role="menuitem" className="mt-1 block rounded-xl px-3 py-2 text-[13px] font-semibold text-fg/70 hover:text-fg">
              {m.allServices} →
            </SmartLink>
          </li>
        </ul>
      </div>
      <div {...col(1)}>
        <p className={heading}>{m.howItWorksHeading}</p>
        <ol className="space-y-0.5">
          {m.howItWorks.map((item, i) => (
            <li key={item.label}>
              <SmartLink href={item.href} onClick={onNavigate} role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-accent/[0.06] hover:text-fg">
                <span className="text-[11px] font-semibold tabular-nums text-accent-display" aria-hidden="true">
                  0{i + 1}
                </span>
                {item.label}
              </SmartLink>
            </li>
          ))}
        </ol>
      </div>
      <div {...col(2)}>
        <p className={heading}>{m.whyHeading}</p>
        <ul className="space-y-1">
          {m.why.map((w) => (
            <li key={w.title}>
              <SmartLink href={w.href} onClick={onNavigate} role="menuitem" className="block rounded-xl bg-fg/[0.03] px-3.5 py-2.5 transition-colors hover:bg-accent/[0.08]">
                <p className="text-[14px] font-semibold text-fg">{w.title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-muted">{w.body}</p>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
