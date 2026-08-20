# The Curated Renter

A personality-led rental decor publication for US renters, with a custom content studio for editing stories, shop products, content pillars, colors, fonts, and site copy.

## Run locally

Requirements: Node.js 20+ and npm (or pnpm).

```bash
cd site
npm install
npm run dev
```

## Deploy on Netlify

- Build command: `npm run build`
- Publish directory: `site/dist/public`
- Base directory: `site`

The included `public/_redirects` keeps client-side routes such as `/admin/` working after refresh.

## Admin editor

Open `/admin/` to edit site appearance, stories, shop products, and content pillars. Click **Save changes**. This version stores edits in the browser's local storage, so it persists across reloads on the same browser. For production use, add authentication and a server database before exposing the admin route publicly.

## Important files

- `site/src/App.tsx` — routes
- `site/src/data/content.ts` — editorial content and saved site settings
- `site/src/pages/admin-page.tsx` — custom admin editor
- `site/src/pages/curated-pages.tsx` — public pages
- `site/src/components/site-shell.tsx` — navigation and footer
- `site/public/_redirects` — Netlify SPA fallback
- `site/public/robots.txt` — crawler rules
- `site/public/llms.txt` — AI-answer-engine context

## Build

```bash
cd site
npm run build
```
