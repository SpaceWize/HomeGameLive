/**
 * Resolves a path in /public against the deploy base.
 *
 * GitHub Pages serves this project from /HomeGameLive/, so a bare "/images/x.png"
 * would 404 in production while working fine in dev. Vite exposes the configured
 * base as BASE_URL, and everything in /public sits directly under it.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/([^:]\/)\/+/g, '$1');
}
