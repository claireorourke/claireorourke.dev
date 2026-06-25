# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run tsc       # Type-check only (tsc -b)
npm run build     # Production build
npm run preview   # Preview production build
npm run deploy    # Build + push dist/ to the `pages` branch for GitHub Pages
```

No test runner is configured. Formatting uses Prettier with `tabWidth: 4`.

## Architecture

Client-side-only React + TypeScript app built with Vite. No backend, database, or authentication.

- `src/index.tsx` — entry point; mounts `<App />` inside StrictMode
- `src/App.tsx` — root component

**Deploy**: `deploy.sh` clones (or initializes) the `pages` orphan branch into `dist/`, runs `vite build`, then commits and pushes. `public/CNAME` is copied into `dist/` by Vite so GitHub Pages serves the site at `claireorourke.dev`.

Internal imports use `.js` extensions (Vite/ESM convention with TypeScript `"moduleResolution": "bundler"` implied by the `nodenext` + `skipLibCheck` config).
