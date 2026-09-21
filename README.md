# rohandev

Rohan's portfolio: SWE at TechCrafter, open to projects. Built with Astro 5 (static), React islands, Tailwind 3 and shadcn/ui primitives.

## Run it

```bash
npm install
npm run dev        # http://localhost:1234
npm run build      # astro check + astro build
npm run preview    # serve the built dist/
```

## Environment

The GitHub activity panel on the homepage reads your contribution calendar at build time. Create a `.env` file (git-ignored) with:

```
ACCESS_TOKEN=<GitHub personal access token with read:user>
```

Set the same `ACCESS_TOKEN` in your hosting provider's environment variables for production builds. Without it the panel is left out and the build logs a GitHub API error, which is expected.

## Where things live

- `src/consts.ts`: site title, description, role, status, resume link, nav and social links.
- `src/content/`: blog posts (MDX), authors and projects.
- `src/pages/`: routes. `src/components/`: site chrome and rows. `src/styles/global.css`: design tokens for the light and dark themes.
- `public/`: fonts, favicons, share images (`static/twitter-card.png`, `static/1200x630.png`) and the author avatar (`avatar.svg`). The resume is a Google Drive link set in `src/consts.ts`.

More detail for contributors and agents: `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`.
