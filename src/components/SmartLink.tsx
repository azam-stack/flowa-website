import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { isRouteHref } from "./Button";

/**
 * One link component for content-driven hrefs: routes ("/cases",
 * "/#team") use the router so the app never reloads; anchors ("#contact"),
 * mailto and external URLs render as plain anchors.
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
