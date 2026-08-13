import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages serves a project site from /<repo-name>/ rather than the domain
 * root, so the production build needs that prefix on every asset URL.
 *
 * This MUST match the repository name exactly, including capitalisation —
 * GitHub Pages paths are case-sensitive. If you rename the repository, change
 * this line too or the deployed page will load with no CSS or JS.
 *
 * Set it to '/' when deploying to a domain root or a custom domain.
 */
const REPO_BASE = '/HomeGameLive/';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev is always served from the root, so a normal localhost URL works.
  base: command === 'build' ? REPO_BASE : '/',
  server: { port: 5173 },
}));
