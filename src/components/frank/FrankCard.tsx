import { FrankAvatar, type FrankPose } from "./FrankAvatar";
import { home } from "@/content/frank/home";

/**
 * The agent card: Frank (3D render or idle loop) inside a white card with a 1px ink
 * border and 16px radius, and the black label bar "Frank | AI Outbound
 * Agent" across the full card width (brief §4.1, §4.6).
 */
export function FrankCard({ pose = "portrait", className = "", label = home.meet.nameBar, decorative = false, video = false, eager = false }: { pose?: FrankPose; className?: string; label?: string; decorative?: boolean; video?: boolean; eager?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 rounded-card border border-ink bg-surface p-2 ${className}`}>
      <FrankAvatar pose={pose} decorative={decorative} video={video} eager={eager} className="aspect-square w-full rounded-[10px]" />
      <div className="label-bar px-3 py-2 text-center text-[13px] font-medium">{label}</div>
    </div>
  );
}
