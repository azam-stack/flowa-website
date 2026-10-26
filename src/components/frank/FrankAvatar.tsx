import { SmileyBall } from "./Icons";

/**
 * Frank is the name of the system, not a character. Wherever the site
 * used to show his rendered portrait, it now shows Flowa's mark: the
 * orange ball on ink. `round` is the small avatar form (chat, nav, lists);
 * the default is a soft tile for larger slots. Poses are accepted for
 * API compatibility and ignored.
 */
export type FrankPose = "portrait" | "wave" | "laptop" | "thumbs";

export const FRANK_ALT = "Frank, Flowa's AI outbound agent";

export function FrankAvatar({
  className = "",
  decorative = false,
  round = false,
}: {
  pose?: FrankPose;
  bg?: "apricot" | "none";
  className?: string;
  decorative?: boolean;
  round?: boolean;
  video?: boolean;
  eager?: boolean;
}) {
  const label = decorative ? undefined : FRANK_ALT;
  if (round) {
    return (
      <span role={decorative ? undefined : "img"} aria-label={label} aria-hidden={decorative || undefined} className={`grid place-items-center rounded-full bg-ink ${className}`}>
        <SmileyBall size={0} className="h-[46%] w-[46%] [&_path]:fill-brand" />
      </span>
    );
  }
  return (
    <span role={decorative ? undefined : "img"} aria-label={label} aria-hidden={decorative || undefined} className={`grid place-items-center bg-panel ${className}`}>
      <span className="grid h-[42%] w-[42%] place-items-center rounded-[22%] bg-ink">
        <SmileyBall size={0} className="h-[52%] w-[52%] [&_path]:fill-brand" />
      </span>
    </span>
  );
}
