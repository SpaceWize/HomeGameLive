import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to https://spacewize.github.io/HomeGameLive/ so assets need the repo
// name as their base. `npm run dev` serves from '/' for a normal local URL.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/HomeGameLive/' : '/',
  server: { port: 5173 },
}));
