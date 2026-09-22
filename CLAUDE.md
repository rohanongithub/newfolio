# CLAUDE.md

Personal portfolio for Rohan (`rohandev`). Astro 5 (static) + React 18 islands + Tailwind 3 + shadcn/ui, forked from the astro-erudite template. Branch `f/restyled` holds the full visual redesign; `main` is the base.

## Commands

- `npm run dev`: dev server on port 1234 (host enabled, dev toolbar off).
- `npm run build`: `astro check && astro build`. Must pass before finishing any change.
- `npm run preview`: serve the built `dist/`.
- `npm run prettier`: format (no semicolons, single quotes; astro, tailwind, and organize-imports plugins).

## Layout

- `src/pages/`: `index.astro`, `about.astro` (nav label "works"), `404.astro`, `blog/`, `authors/`, `tags/`, plus `rss.xml.ts` and `robots.txt.ts` endpoints.
- `src/layouts/Layout.astro`: shell (Head, Header, main, Footer).
- `src/components/`: `.astro` components, React islands (pagination, avatar), and shadcn primitives in `ui/`. Site chrome: `Header`, `Footer`, `ThemeToggle`, `CandidateBand` (home band + stage rail), `PageBand` (inner pages), `WorkRow`, `PostRow`, `ClaimCard` (Claim Yours panel, dialog and its script).
- `src/content/`: collections `blog` (MDX), `authors`, `projects`. Schemas in `src/content.config.ts` (blog title max 60 chars, description max 155).
- `src/consts.ts`: `SITE`, `PROFILE`, `NAV_LINKS`, `SOCIAL_LINKS`. Change site-wide copy and links here. Homepage rules live in `SITE`: `NUM_WORKS_ON_HOMEPAGE` (2) and `NUM_POSTS_ON_HOMEPAGE` (1); the full lists are on `/about` and `/blog`.
- `src/lib/`: `utils.ts` (`cn()`), `works.ts` (`getWorks()`: the projects collection in `order`), `server-utils.ts`, and `visitor-card/` (the canvas card engine behind Claim Yours: `palette`, `art`, `stamps`, `draw`, `counter`; browser only, no dependencies). `src/scripts/`: `github.ts`.
- `src/styles/global.css` and `tailwind.config.ts`: design tokens (HSL CSS variables, light in `:root`, dark in `.dark`) and component classes (`.panel`, `.chip`, `.btn`, `.row-link`, `.meta`). `public/fonts/` holds the self-hosted variable fonts (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono, all OFL).
- Theme: follows `prefers-color-scheme` until the visitor toggles; stored in `localStorage` key `theme`; applied before paint by the inline script in `Head.astro`.
- Homepage layout: from `lg`, the main column and the sidebar are equal height and the last panel in each (Activity and Claim Yours) stretches so their bottoms align; do not add a fixed height to either, and keep Stack at its natural height (Docker, AWS, Node.js only).
- Motion: shared tokens (`--ease-out-expo`, `--ease-reveal`, `--dur-*`) are in `:root`. The theme reveal (View Transitions) is scoped to `html.theme-reveal`; keep that scope so page navigations are unaffected, and read the `--dur-*` unit in JS (the minifier emits `.65s`). The nav underline is a JS-positioned element (`data-nav-indicator` in `Header.astro`) with a noscript fallback; do not put the underline back on the link. The Activity cells take a cursor trail from `Github.astro` through `--heat`. New JS animation must check `matchMedia('(prefers-reduced-motion: reduce)')`, since the global CSS clamp does not stop Web Animations API calls.
- Icons: `lucide:` for UI, `simple-icons:` (monochrome, `currentColor`) for the Stack tiles, via `astro-icon`.
- Import alias: `@/*` maps to `src/*`.

## Gotchas

- Claim Yours (visitor card) is entirely front-end. The Nth visitor number comes from the free counter at `abacus.jasoncameron.dev` (`CARD` in `src/consts.ts`), hit once per browser (`GET /hit/rohandev-vercel-app/cards`); the number is remembered in `localStorage`, so Shuffle and more cards never inflate it, and the name is never sent. If the counter is down the card shows "CARD ID xxxx" instead of a rank. Keys: `visitor-card:number`, `visitor-card:id`, `visitor-card:hues`. Tests must stub `fetch` for that host so the real count is not polluted. A card is only as trustworthy as that free service; swap `CARD` for another counter if it goes away.

- `src/scripts/github.ts` caches the contribution calendar (15 min on success, 1 min on failure) and times out after 5s. Without this, every render of Home in `astro dev` called GitHub again (about 0.5s each), which made Home the only slow page in dev. Do not remove the cache.
- Share cards: `npm run og` regenerates one 1200x630 card per project into `public/static/og/<id>.png` (needs local Chrome; set `CHROME_PATH` if not found). Project pages use their card when the file exists, otherwise the site card. Run it after adding or editing a project and commit the PNGs. The home card is `public/static/twitter-card.png`.
- Browser-surface details: text selection on `.bg-band` is white; `.row-link` focus rings are drawn inset (rows sit in `overflow-hidden` panels); all hover styles are gated to `(hover: hover)` (`future.hoverOnlyWhenSupported` plus hand-written rules), so taps do not stick.
- `theme-color` is pinned to the site theme in JS (`syncThemeColor` in the `Head.astro` inline script, also called from `ThemeToggle.astro`); any new place that changes the theme class must call it.
- The stage rail intro plays on a fresh load and reload but not on a client-side return to Home (`html[data-rail-seen]`).
- `src/styles/katex.css` imports a stylesheet from a third-party CDN on every page although no page contains math; load it only where math appears if this is cleaned up.
- `.env` (git-ignored) needs `ACCESS_TOKEN` for the GitHub contribution tile; without it the Activity panel is simply omitted (the build logs a GitHub API error, which is expected).
- `astro.config.ts` `site` and `SITE.SITEURL` are `https://rohandev.online` (a GoDaddy domain pointed at the Vercel deployment; the project's `rohandev.vercel.app` Vercel subdomain still resolves and Vercel redirects it to the custom domain). Confirmed by the owner as the production domain.
- The Works intro copy (`about.astro`) and the author bio are the owner's own words; do not rewrite without asking.
- Share images (`public/static/twitter-card.png` for the homepage default, `public/static/1200x630.png` for posts without an image) are generated from HTML with the site fonts; regenerate them if the role, status or brand colour changes.
- Favicons (`public/favicon.svg`, `.ico`, PNG sizes, `safari-pinned-tab.svg`, manifest colours) are the cobalt tile with the white Bricolage "R"; keep the tile colour equal to the band colour (`hsl(232 91% 55%)`, `#2440F5`).
- The resume is the Google Drive link in `PROFILE.resume`; there are no resume PDFs in the repo (removed at the owner's request).
- Projects live in `src/content/projects/*.md` or `*.mdx` (one file each; use MDX only when the write-up embeds a component such as a diagram from `src/components/diagrams/`). Frontmatter: `name`, `order`, `description`, `tags`, optional `image` (path to a file in `src/assets/projects/`), `role`, `year`, `status`. There is no external `link` field on purpose (the owner does not share project links). Rows on Home and Works are compact tiles that link to a dedicated page `/projects/[id]` (`src/pages/projects/[id].astro`), which renders the full markdown body with a table of contents and previous/next links. Write body headings as `##` (the page title is the h1).
- No emojis and no em dashes anywhere on the site (owner rule).
- `dist/`, `.astro/`, `node_modules/`, `.env`, and most of `.impeccable/` are git-ignored.

## Design work (Impeccable)

The `impeccable` plugin (v4.3.1, marketplace `pbakaus/impeccable`) is installed. All UI and visual work goes through the `impeccable` skill (`/impeccable ...`).

- Product truth: `PRODUCT.md`. Visual system: `DESIGN.md` (written at the end of the redesign by the documenter). Surface strategy and the direction contract: the surface brief (`impeccable surface-brief read src/pages/index.astro`).
- Build path is code-first (`.impeccable/config.json`).
- Never copy the direction contract into shipped source, comments, or attributes.
- Run `impeccable detect --json <changed files>` once when the UI is finished; do not run it during concept selection.
- Rules for agents live in `.claude/rules/`. The redesign plan and content inventory live in `docs/`.
