import type { ComponentProps } from "react";
import { LinkButton } from "./Button";
import { SITE_CONFIG } from "@/config/site";
import { nav } from "@/content/site.en";
import { track } from "@/lib/analytics";

/**
 * The one booking flow. Every "Book a call" on the site renders through
 * here, so the destination is decided once: VITE_BOOKING_URL when a
 * booking tool is connected, otherwise the lead form on the current page.
 */
export function bookingHref(): string {
  return SITE_CONFIG.bookingUrl ?? SITE_CONFIG.contactAnchor;
}

type Props = Omit<ComponentProps<typeof LinkButton>, "href" | "children"> & {
  /** Where on the page the button sits, for analytics. */
  location: string;
  service?: string;
  children?: string;
};

export function BookCallLink({ location, service, children, onClick, ...rest }: Props) {
  const href = bookingHref();
  const external = href !== SITE_CONFIG.contactAnchor;
  return (
    <LinkButton
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        track("book_call_click", { location, service, destination: external ? "booking-tool" : "form" });
        track("cta_click", { cta: children ?? nav.bookCall, location, service });
        onClick?.(e);
      }}
      {...rest}
    >
      {children ?? nav.bookCall}
    </LinkButton>
  );
}
