import { defineConfig } from 'astro/config';

// ─── GitHub Pages configuration ─────────────────────────────────────────────
// Set 'site' to your GitHub Pages URL, e.g. https://yourusername.github.io
//
// If your repo is NOT named 'yourusername.github.io' (i.e. it's a project repo),
// also uncomment 'base' and set it to your repo name, e.g. '/geerods'
// ────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://getsetpixel.github.io',
  base: '/GeeRods',
  output: 'static',
});
