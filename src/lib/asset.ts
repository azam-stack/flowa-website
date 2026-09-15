/**
 * Resolves a public-folder path against Vite's base URL, so the same
 * build works at the domain root (flowa.dk) and under a sub-path
 * (GitHub Pages at /flowa-website/). Use it for every `public/` file
 * referenced from code.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
