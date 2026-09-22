# Redesign plan

Full visual replacement of the portfolio using the Impeccable plugin. Branch: `f/restyled`.

## Decisions (confirmed)

- Audience: recruiters and hiring managers.
- Scope: every page and the shared shell (home, works, blog, authors, tags, 404, header, footer).
- Keep nothing of the old look. Content, links, resume, routes, and features stay.
- Build path: code-first (direction contract, no mock images).
- Direction chosen: **Hiring Pipeline** (applicant-tracking candidate record, cobalt band, stage rail with an "Advance to interview" action).
- Follow-up requests after the first review: add a dark theme with toggle, remove "Off the clock", make the Stack section uniform, remove the logo mark beside the wordmark. Works intro copy deliberately left untouched.

## Flow

1. `PRODUCT.md` (init): product truth only.
2. New-work: name the mechanism, list seven concrete visual systems from the audience's world, run `impeccable concept-seed --scope direction --mode persuade`, present on the decision page, user locks one direction.
3. Record the direction contract in the surface brief (`impeccable surface-brief write`).
4. Build: tokens and type, shell, home, works, blog and taxonomy pages.
5. One batched desktop+mobile screenshot round, one fix batch, at most one confirming round.
6. `impeccable detect --json` once, then the finish reviewer, then the documenter writes `DESIGN.md` and `.impeccable/design.json`.

## Bugs found in the old site, and what happened

All resolved in the redesign, except where noted.

- `Head.astro` favicon links used `32X32` / `16X16` (files are lowercase `x`): fixed.
- `Github.astro` loaded `/scripts/github.ts`, which is not in `public/`: script tag removed.
- `tailwind.config.ts` font entries used file paths and misspelled filenames: replaced with family names.
- `astro.config.ts` `site` disagreed with `SITE.SITEURL`; both resolved.
- Not a bug: `SocialIcons` already prepends `mailto:` for the Email link.

## Open questions

- (Resolved) Production domain: https://rohandev.online (GoDaddy domain, DNS pointed at Vercel; the Vercel subdomain still resolves).
- (Resolved: the old template projects, including Tremis which was not the owner's, were replaced by AEGIS.)
- (Resolved) Canonical resume link: Google Drive; repo PDFs removed.

## Verification

`npm run build`, then dev server at port 1234, then desktop and mobile screenshots into `.impeccable/review/`. Manual checks: resume link, nav, blog pagination, MDX post (code blocks, KaTeX), the GitHub tile.

## Status at hand-off

Built, polished, and independently reviewed. Done since the first build: light and dark themes with a toggle, uniform Stack, no logo mark in the header, favicon set, status "Open to projects", role "SWE at TechCrafter", R-tile alignment (top edge matches the name to the pixel), no emojis or em dashes, branded share images, three-line clamp on home project rows, tap-target and contrast fixes, unused files and packages removed, README added.

Later additions: Stack trimmed to Docker, AWS and Node.js; Claim Yours (generated, downloadable visitor card with a real counter, IST time, stamps and holo variants; see DESIGN.md).

Open items (need the owner):

- GitHub Activity panel: needs `ACCESS_TOKEN` in `.env` and in Vercel environment variables.
- (Resolved) Author bio is now "weaving codebases" and the avatar is the R tile (`public/avatar.svg`).
- More projects: send them in the per-project markdown format (see CLAUDE.md). AEGIS needs a cover image (`cover-aegis.png`).
- Works intro copy has "Its" and informal wording; left as is on the owner's instruction.
- Interview wording on the homepage was kept by the owner although they are employed and open to projects.
