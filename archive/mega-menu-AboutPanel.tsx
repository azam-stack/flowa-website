import { nav } from "@/content/site.en";
import { StaggerCol } from "./StaggerCol";

export function AboutPanel({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const p = nav.aboutPanel;
  const hasLearn = p.learn.length > 0;
  return (
    <div className={`grid gap-8 p-6 ${hasLearn ? "grid-cols-2" : "grid-cols-1"}`} role="none">
      <StaggerCol index={0} open={open}>
        <p className="mb-3 text-xs font-semibold text-muted">{p.companyHeading}</p>
        <ul className="space-y-0.5">
          {p.company.map((item) => (
            <li key={item.title}>
              <a href={item.href} onClick={onNavigate} role="menuitem" className="block rounded-lg px-3 py-2 text-sm font-medium text-fg/80 transition-colors hover:bg-accent/5 hover:text-accent-hover">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </StaggerCol>
      {hasLearn && (
        <StaggerCol index={1} open={open}>
          <p className="mb-3 text-xs font-semibold text-muted">{p.learnHeading}</p>
          <ul className="space-y-0.5">
            {p.learn.map((item) => (
              <li key={item.title}>
                <a href={item.href} onClick={onNavigate} role="menuitem" className="block rounded-lg px-3 py-2 text-sm font-medium text-fg/80 transition-colors hover:bg-accent/5 hover:text-accent-hover">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </StaggerCol>
      )}
    </div>
  );
}
