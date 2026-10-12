import { SmartLink } from "@/components/SmartLink";
import { announcement } from "@/content/frank/chrome";
import { track } from "@/lib/analytics";
import { ArrowUpRight, SmileyBall } from "./Icons";

/** Sticky top bar, 56px, brand orange with ink text (never white on orange). Brief §3.1. */
export function AnnouncementBar() {
  return (
    <div className="bg-brand text-ink">
      <SmartLink href={announcement.href} aria-label={announcement.ariaLabel} onClick={() => track("announcement_click")} className="group mx-auto flex h-14 w-full max-w-container items-center justify-center gap-2.5 px-4 text-[15px] md:text-[16px]">
        <SmileyBall className="flex-none" />
        <span className="truncate">
          <strong className="font-semibold">{announcement.lead}</strong>
          {announcement.rest}
        </span>
        <ArrowUpRight size={18} className="flex-none transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </SmartLink>
    </div>
  );
}
