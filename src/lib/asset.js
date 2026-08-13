/**
 * Resolves a path in /public against the deploy base.
 *
 * GitHub Pages serves a project site from a subpath rather than the domain
 * root, so a bare "/images/x.png" works in dev and 404s in production. Vite
 * exposes the configured base as BASE_URL, and /public sits directly under it.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/([^:]\/)\/+/g, '$1');
}
