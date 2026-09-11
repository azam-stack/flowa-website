import { nav } from "@/content/site.en";
import { StaggerCol } from "./StaggerCol";

export function IndustriesPanel({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div className="p-3" role="none">
      <StaggerCol index={0} open={open}>
        <ul className="space-y-0.5">
          {nav.industriesPanel.map((item) => (
            <li key={item.title}>
              <a href={item.href} onClick={onNavigate} role="menuitem" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-fg/80 transition-colors hover:bg-accent/5 hover:text-accent-hover">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </StaggerCol>
    </div>
  );
}
