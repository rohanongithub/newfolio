# Design rules

- Route every UI, layout, typography, color, motion, or copy change through the `impeccable` skill. Do not hand-roll a visual direction outside it.
- Before editing UI, read `PRODUCT.md`, `DESIGN.md` (once it exists), and the surface brief for the target page.
- This is a **redesign**: keep content, links, routes, and function; the old look (black bento, offbit/Stopwatch pixel fonts) is gone; do not reintroduce it.
- The site has a light and a dark theme. Any new color must be defined for both in `global.css` (`:root` and `.dark`) and checked for contrast in both. The cobalt band uses `--band`; text/selected states use `--primary`.
- The visitor mode for the homepage is Persuade (recruiters act on it). The blog is Read. Works is Persuade.
- Do not invent claims: no fake testimonials, employers, metrics, or projects. Label any placeholder as such and list it for replacement.
- Fonts: avoid the skill's banned training-data defaults (Fraunces, Playfair, Space Grotesk, Inter-as-display, DM Sans, IBM Plex, and the rest of its list).
- Keep accessibility baseline: AA contrast, visible focus, keyboard nav, `prefers-reduced-motion`.
- Verify in bounded passes: one batched desktop+mobile screenshot round (light and dark), one fix batch, at most one confirming round, then the finish reviewer.
- The direction contract lives only in the surface brief, never in source.
