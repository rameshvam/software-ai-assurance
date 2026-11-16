import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

// GH_PAGES=1 builds a static review copy for GitHub Pages:
//  - served under /<repo>/
//  - contact form runs in demo mode (no Node back end on Pages)
//  - 404.html copy of index.html so deep links work
//  - noindex, so the draft is not picked up by search engines
const ghPages = !!process.env.GH_PAGES;
const repo = process.env.GH_PAGES_REPO || 'software-ai-assurance';

export default defineConfig({
  base: ghPages ? `/${repo}/` : '/',
  define: {
    'import.meta.env.VITE_STATIC_DEMO': JSON.stringify(ghPages ? '1' : ''),
  },
  plugins: [
    react(),
    ghPages && {
      name: 'gh-pages-extras',
      transformIndexHtml: (html) => html.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow" />'),
      closeBundle() {
        const dist = resolve(process.cwd(), 'dist');
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
      },
    },
  ].filter(Boolean),
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8787' },
  },
});
