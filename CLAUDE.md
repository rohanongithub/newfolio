# CLAUDE.md

Personal portfolio for Rohan (`rohandev`). Astro 5 (static) + React 18 islands + Tailwind 3 + shadcn/ui, forked from the astro-erudite template. Branch `f/restyled` holds the full visual redesign; `main` is the base.

## Commands

- `npm run dev`: dev server on port 1234 (host enabled, dev toolbar off).
- `npm run build`: `astro check && astro build`. Must pass before finishing any change.
- `npm run preview`: serve the built `dist/`.
- `npm run prettier`: format (no semicolons, single quotes; astro, tailwind, and organize-imports plugins).

## Layout

- `src/pages/`: `index.astro`, `about.astro` (nav label "works"), `404.astro`, `blog/`, `authors/`, `tags/`, `projects/tremis/`, plus `rss.xml.ts` and `robots.txt.ts` endpoints.
- `src/layouts/Layout.astro`: shell (Head, Header, main, Footer).
- `src/components/`: `.astro` components, React islands (`Music.tsx`, pagination, avatar), and shadcn primitives in `ui/`. Site chrome: `Header`, `Footer`, `ThemeToggle`, `CandidateBand` (home band + stage rail), `PageBand` (inner pages), `WorkRow`, `PostRow`.
- `src/content/`: collections `blog` (MDX), `authors`, `projects`. Schemas in `src/content.config.ts` (blog title max 60 chars, description max 155).
- `src/consts.ts`: `SITE`, `NAV_LINKS`, `SOCIAL_LINKS`. Change site-wide copy and links here.
- `src/lib/`: `utils.ts` (`cn()`), `works.ts` (the four works: Tremis + the projects collection), `music.ts`, `server-utils.ts`. `src/scripts/`: `github.ts`.
- `src/styles/global.css` and `tailwind.config.ts`: design tokens (HSL CSS variables, light in `:root`, dark in `.dark`) and component classes (`.panel`, `.chip`, `.btn`, `.row-link`, `.meta`). `public/fonts/` holds the self-hosted variable fonts (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono, all OFL).
- Theme: follows `prefers-color-scheme` until the visitor toggles; stored in `localStorage` key `theme`; applied before paint by the inline script in `Head.astro`.
- Icons: `lucide:` for UI, `simple-icons:` (monochrome, `currentColor`) for the Stack tiles, via `astro-icon`.
- Import alias: `@/*` maps to `src/*`.

## Gotchas

- `.env` (git-ignored) needs `ACCESS_TOKEN` for the GitHub contribution tile; without it the Activity panel is simply omitted (the build logs a GitHub API error, which is expected).
- `astro.config.ts` `site` was changed from the template's `astro-erudite.vercel.app` to `https://rohandev.vercel.app` (matching `SITE.SITEURL`). Confirmed by the owner as the production domain.
- The last.fm widget fetches from a third-party URL at runtime; on failure `Music.tsx` renders nothing.
- The Works intro copy (`about.astro`) and the author bio are the owner's own words; do not rewrite without asking.
- Share images (`public/static/twitter-card.png` for the homepage default, `public/static/1200x630.png` for posts without an image) are generated from HTML with the site fonts; regenerate them if the role, status or brand colour changes.
- Favicons (`public/favicon.svg`, `.ico`, PNG sizes, `safari-pinned-tab.svg`, manifest colours) are the cobalt tile with the white Bricolage "R"; keep the tile colour equal to the band colour (`hsl(232 91% 55%)`, `#2440F5`).
- The resume is the Google Drive link in `PROFILE.resume`; there are no resume PDFs in the repo (removed at the owner's request).
- The projects section (`src/content/projects/`, `src/lib/works.ts`, `/projects/tremis`, `WorkRow`) is placeholder content the owner will replace; do not edit it unasked. Tremis is not the owner's project.
- No emojis and no em dashes anywhere on the site (owner rule).
- `dist/`, `.astro/`, `node_modules/`, `.env`, and most of `.impeccable/` are git-ignored.

## Design work (Impeccable)

The `impeccable` plugin (v4.3.1, marketplace `pbakaus/impeccable`) is installed. All UI and visual work goes through the `impeccable` skill (`/impeccable ...`).

- Product truth: `PRODUCT.md`. Visual system: `DESIGN.md` (written at the end of the redesign by the documenter). Surface strategy and the direction contract: the surface brief (`impeccable surface-brief read src/pages/index.astro`).
- Build path is code-first (`.impeccable/config.json`).
- Never copy the direction contract into shipped source, comments, or attributes.
- Run `impeccable detect --json <changed files>` once when the UI is finished; do not run it during concept selection.
- Rules for agents live in `.claude/rules/`. The redesign plan and content inventory live in `docs/`.
