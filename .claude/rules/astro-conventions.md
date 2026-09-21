# Astro conventions

- Use `@/` imports for anything under `src/`.
- Prefer `.astro` components; use a React island (`client:load` / `client:visible`) only for real interactivity (e.g. pagination, avatar).
- Style with Tailwind utilities and the HSL CSS variables in `src/styles/global.css`; extend `tailwind.config.ts` rather than hardcoding hex values in markup.
- Fonts are self-hosted in `public/fonts/` and declared with `@font-face` in `global.css`. Reference families by name, not file path, in `tailwind.config.ts`.
- Merge class names with `cn()` from `src/lib/utils.ts`.
- Site-wide copy, nav, and social links belong in `src/consts.ts`.
- Content changes go through the collections in `src/content/`; keep them valid against `src/content.config.ts`.
- Scripts loaded from markup must resolve: put runtime scripts in `src/scripts/` and import them in the component, not via absolute `/src/...` or nonexistent `/scripts/...` paths.
- Prettier style: no semicolons, single quotes. Run `npm run build` (includes `astro check`) before finishing.
