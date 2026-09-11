import { ArrowRight } from "lucide-react";
import { nav } from "@/content/site.en";
import { StaggerCol } from "./StaggerCol";

export function ServicesPanel({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const p = nav.servicesPanel;
  return (
    <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 p-8" role="none">
      <StaggerCol index={0} open={open}>
        <p className="mb-3 text-xs font-semibold text-muted">{p.coreHeading}</p>
        <ul className="space-y-1">
          {p.core.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                onClick={onNavigate}
                role="menuitem"
                className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/5 focus-visible:bg-accent/5"
              >
                <p className="text-[15px] font-semibold text-fg group-hover:text-accent-hover">{item.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-muted">{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </StaggerCol>

      <StaggerCol index={1} open={open}>
        <p className="mb-3 text-xs font-semibold text-muted">{p.howWeWorkHeading}</p>
        <ul className="space-y-0.5">
          {p.howWeWork.map((item) => (
            <li key={item.title}>
              <a href={item.href} onClick={onNavigate} role="menuitem" className="block rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-accent/5 hover:text-accent-hover">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </StaggerCol>

      <StaggerCol index={2} open={open}>
        <p className="mb-3 text-xs font-semibold text-muted">{p.bySizeHeading}</p>
        <ul className="space-y-0.5">
          {p.bySize.map((item) => (
            <li key={item.title}>
              <a href={item.href} onClick={onNavigate} role="menuitem" className="block rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-accent/5 hover:text-accent-hover">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </StaggerCol>

      <StaggerCol index={3} open={open}>
        <a
          href={p.featured.href}
          onClick={onNavigate}
          role="menuitem"
          className="group flex h-full flex-col justify-between rounded-2xl bg-accent/[0.08] p-5 transition-colors hover:bg-accent/[0.14]"
        >
          <div>
            <p className="text-base font-bold text-fg">{p.featured.title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.featured.body}</p>
          </div>
          <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent-hover">
            {p.featured.linkLabel}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </StaggerCol>
    </div>
  );
}
