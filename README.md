# GeeRods Website

This is an Astro-powered static website for GeeRods.

## Project overview

- Built with [Astro](https://astro.build)
- Content is split into:
  - `src/data/site.js` for home page and gallery data
  - `src/content/blog/` for Markdown blog posts
- Styling is in `src/styles/global.css`
- Pages are in `src/pages/`
- GitHub Pages deploy workflow is set up at `.github/workflows/deploy.yml`

## Quick start

1. Open the project folder in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Start the local development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal (default is `http://localhost:4321`).

## Build for production

```bash
npm run build
```

The generated static site is written to `dist/`.

To preview the production build locally:

```bash
npm run preview
```

## Editing site content

### Home page and site data

Edit `src/data/site.js` to update:

- hero carousel slides
- stats strip values
- build cards on the Builds page
- gallery images, captions, and categories

Each item is stored as a JavaScript object, so no HTML editing is required for routine updates.

### Blog posts

Add Markdown files to `src/content/blog/`.

Example frontmatter:

```md
---
title: "My new post"
date: 2026-06-19
description: "Short summary of the article"
tags: ["builds", "tips"]
image: "https://example.com/image.jpg"
imageAlt: "Descriptive alt text"
---

Write your post content here.
```

The blog listing page is automatically generated from the Markdown files in `src/content/blog/`.

### Static pages

The primary page templates live in `src/pages/`:

- `src/pages/index.astro` — Home
- `src/pages/builds.astro` — Builds
- `src/pages/repairs.astro` — Repairs
- `src/pages/gallery.astro` — Gallery
- `src/pages/contact.astro` — Contact
- `src/pages/blog/index.astro` — Blog list
- `src/pages/blog/[...slug].astro` — Blog post template

## Deployment

This project includes a GitHub Actions workflow to deploy to GitHub Pages.

### Configure Astro for GitHub Pages

Open `astro.config.mjs` and update the `site` URL:

```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  // base: '/geerods',
  output: 'static',
});
```

If this repository is a project site (not `yourusername.github.io`), also uncomment and update `base`:

```js
base: '/geerods',
```

### GitHub Pages deployment

1. Commit and push the repository to GitHub.
2. Enable Pages via the Actions workflow.
3. The workflow in `.github/workflows/deploy.yml` will build and deploy the site automatically on pushes to `main`.

## Notes

- This is a static site, so there is no server-side backend.
- The project currently uses the Astro build output in `dist/`.
- If you keep the old root `index.html`, `style.css`, `script.js`, and `content.js` files, they are no longer required by the Astro site.

## Useful commands

```bash
npm install
npm run dev
npm run build
npm run preview
```