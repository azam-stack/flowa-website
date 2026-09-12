import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { commitmentsBar } from "@/content/site.en";

/**
 * Attached directly above RiskBand (section 4) — not its own top-level
 * section. Moved out of the hero once ClientLogos took its place there
 * (client-logo-marquee brief). Commitments, not history: Flowa has no
 * client base or performance record to quote a stat bar from (see PART 0
 * of the restructure brief).
 */
export function CommitmentsBar() {
  return (
    <Container className="my-10 md:my-14">
      <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {commitmentsBar.items.map((item) => (
          <div key={item.label} className="flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-6 text-center">
            <p className="text-[clamp(2.5rem,3.6vw,3.5rem)] font-extrabold leading-none text-accent-display">{item.figure}</p>
            <p className="mt-2.5 text-[15px] leading-snug text-[color:var(--flowa-text)]">{item.label}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}
