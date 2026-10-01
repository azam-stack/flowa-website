import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

/** A route in this app: "/pricing", "/#quote". Anything else is a plain anchor. */
export function isRouteHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * One link component for content-driven hrefs: routes use the router so
 * the app never reloads; anchors ("#quote"), mailto and external URLs
 * render as plain anchors (external ones in a new tab).
 */
export function SmartLink({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isRouteHref(href)) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
