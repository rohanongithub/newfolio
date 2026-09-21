---
name: rohandev
description: A personal portfolio built as a hiring-pipeline candidate record. Cobalt band, hairline panels, one moving stage rail.
colors:
  paper: "hsl(222 43% 97%)"
  ink: "hsl(228 40% 9%)"
  card: "hsl(0 0% 100%)"
  cobalt-band: "hsl(232 91% 55%)"
  cobalt-mute: "hsl(232 100% 92%)"
  cobalt-link: "hsl(232 91% 55%)"
  cobalt-wash: "hsl(232 100% 96%)"
  cobalt-wash-ink: "hsl(232 80% 36%)"
  stage-amber: "hsl(44 100% 82%)"
  stage-amber-ink: "hsl(36 100% 16%)"
  advance-green: "hsl(158 84% 26%)"
  advance-green-hover: "hsl(158 84% 22%)"
  fog: "hsl(222 33% 92%)"
  fog-soft: "hsl(222 33% 94%)"
  slate-text: "hsl(226 22% 32%)"
  hairline: "hsl(222 26% 86%)"
  hairline-strong: "hsl(222 16% 58%)"
  error-red: "hsl(0 72% 42%)"
  night-ground: "hsl(228 32% 7%)"
  night-ink: "hsl(222 30% 94%)"
  night-card: "hsl(228 28% 10.5%)"
  night-band: "hsl(232 76% 41%)"
  periwinkle-link: "hsl(231 100% 76%)"
  night-fog: "hsl(228 22% 17%)"
  night-fog-soft: "hsl(228 22% 14%)"
  night-slate-text: "hsl(224 16% 68%)"
  night-wash: "hsl(230 34% 19%)"
  night-wash-ink: "hsl(230 100% 84%)"
  night-amber: "hsl(38 55% 20%)"
  night-advance-green: "hsl(158 72% 28%)"
  night-hairline: "hsl(228 20% 20%)"
  night-hairline-strong: "hsl(228 14% 45%)"
  night-error-red: "hsl(0 72% 55%)"
typography:
  display-name:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "6rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  wordmark:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.75rem
    letterSpacing: "-0.025em"
  panel-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25rem
    fontFeature: "'ss01', 'cv11'"
  lead:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25rem
  button:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25rem
  meta:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1rem
    fontFeature: "tabular-nums"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "32px"
  gutter: "16px"
  gutter-wide: "24px"
  container: "1152px"
  header-height: "56px"
components:
  candidate-band:
    backgroundColor: "{colors.cobalt-band}"
    textColor: "{colors.card}"
    padding: "56px 24px 32px"
  page-band:
    backgroundColor: "{colors.cobalt-band}"
    textColor: "{colors.card}"
    padding: "28px 24px 32px"
  header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    height: "56px"
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  row-link:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    padding: "16px"
  row-link-hover:
    backgroundColor: "{colors.cobalt-wash}"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.cobalt-band}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 20px"
  button-light-hover:
    backgroundColor: "{colors.cobalt-mute}"
  button-advance:
    backgroundColor: "{colors.advance-green}"
    textColor: "{colors.card}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 20px"
  button-advance-hover:
    backgroundColor: "{colors.advance-green-hover}"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 16px"
  button-outline-hover:
    backgroundColor: "{colors.cobalt-wash}"
  button-icon:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "40px"
  button-primary:
    backgroundColor: "{colors.cobalt-link}"
    textColor: "{colors.card}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 16px"
  chip:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  chip-amber:
    backgroundColor: "{colors.stage-amber}"
    textColor: "{colors.stage-amber-ink}"
  chip-cobalt:
    backgroundColor: "{colors.cobalt-wash}"
    textColor: "{colors.cobalt-wash-ink}"
  chip-green:
    backgroundColor: "{colors.advance-green}"
    textColor: "{colors.card}"
  monogram-tile:
    backgroundColor: "#ffffff"
    textColor: "{colors.cobalt-band}"
    rounded: "{rounded.lg}"
    width: "116px"
    height: "80px"
  stack-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 4px"
---

# Design System: rohandev

## Overview

**Creative North Star: "The Candidate Record"**

The site is Rohan's profile inside a recruiter's own applicant-tracking tool: a cobalt band carrying the name and the pipeline rail, then hairline-bordered panels of dense rows and key-value data on cool paper. It reads as working software, not a brochure. Panels, rows, chips and a stage stepper do the work that hero art and card grids do elsewhere. The one authored moment is the rail: "Advance to interview" slides the stage marker from Screening to Interview, then opens a prefilled email.

Density is moderate and data-first. Structure comes from 1px hairlines and background tone, not from shadow or decoration. Colour is disciplined: cobalt owns the band and the stage rail, signal green means advance, amber means the current stage or a status, and everything else is paper and ink. Two themes ship (light and dark) and follow the same anatomy; dark is an ink-navy ground tinted toward the cobalt hue, never pure black.

**Key Characteristics:**
- Full-width cobalt band on every page (profile band on the home page, a shorter page band with breadcrumb elsewhere) above a paper ground.
- Hairline-bordered panels with a barely-there shadow; rows separated by dividers, not cards inside cards.
- Bricolage Grotesque for the name and headings, Hanken Grotesk for UI, JetBrains Mono only for dates, counts and addresses.
- One signature component (the four-stage rail) and one authored motion moment.
- Monochrome icons throughout; the Stack grid uses currentColor glyphs, never brand colours.
- Identity is a name, not a logo: the header carries only the "rohandev" wordmark. The one mark is a white "R" tile beside the name in the profile band, echoed as the favicon and on the share cards.

## Colors

A cool paper-and-ink palette with one saturated cobalt, one signal green and one amber. HSL triples in `src/styles/global.css` are the source of truth; the values above are those triples.

### Primary
- **Cobalt Band** (hsl(232 91% 55%)): the band background on every page and the cobalt link, active-tab and selected-state hue in light theme. In dark, the band deepens to **Night Band** (hsl(232 76% 41%)) and text/selected state lifts to **Periwinkle Link** (hsl(231 100% 76%)), because saturated cobalt fails as text on the navy ground. The band token and the link token are separate variables that coincide in light and diverge in dark.
- **Cobalt Mute** (hsl(232 100% 92%)): secondary text on the band (subtitles, breadcrumbs, inactive stage labels) and the Resume button hover. The Resume button's own text takes the band token (`--band`), so it follows the band in both themes.
- **Cobalt Wash** (hsl(232 100% 96%)) with **Cobalt Wash Ink** (hsl(232 80% 36%)): row hover, outline-button hover, the cobalt chip. Dark equivalents are Night Wash and Night Wash Ink.

### Secondary
- **Advance Green** (hsl(158 84% 26%)): the Advance button and the "Now playing" chip; also added lines in code diffs. Deepens on hover to hsl(158 84% 22%). Dark uses hsl(158 72% 28%) with white text.

### Tertiary
- **Stage Amber** (hsl(44 100% 82%)) with **Stage Amber Ink** (hsl(36 100% 16%)): the current-stage marker and label on the rail, and the "Open to projects" status chip. The stage pair is theme-invariant because it sits on the band. The chip variant of amber inverts in dark (Night Amber, hsl(38 55% 20%), with amber text).

### Neutral
- **Paper** (hsl(222 43% 97%)): page ground. **Card** (white) lifts panels, header and footer above it. Dark: Night Ground (hsl(228 32% 7%)) and Night Card (hsl(228 28% 10.5%)).
- **Ink** (hsl(228 40% 9%)): body and heading text. Dark: Night Ink (hsl(222 30% 94%)).
- **Slate Text** (hsl(226 22% 32%)): descriptions and inactive nav. Dark: hsl(224 16% 68%).
- **Fog** (hsl(222 33% 92%)) and **Fog Soft** (hsl(222 33% 94%)): chip fill, inline-code fill, empty contribution cells.
- **Hairline** (hsl(222 26% 86%)) and **Hairline Strong** (hsl(222 16% 58%), the `--input` token; dark hsl(228 14% 45%)): every 1px border and divider; the strong one for control outlines (raised to reach 3:1 against the surface), scrollbar thumbs, and prose bullets.
- **Error Red** (hsl(0 72% 42%)): destructive only; barely used.

### Named Rules
**The Band Stays Cobalt Rule.** The band and everything sitting on it (stage rail, amber stage marker, white Resume button) do not change hue between themes. Only the cobalt used as text or selected state lifts to periwinkle in dark.

**The Signal Rule.** Green means advance or live; amber means the current stage or a status. Neither is decoration. Do not introduce a fourth signal colour.

**The Tinted Night Rule.** Dark surfaces are tinted toward hue 228-232. Pure black and pure white are not used for ground or text in dark.

## Typography

**Display Font:** Bricolage Grotesque (variable, 200-800, with system sans fallback)
**Body Font:** Hanken Grotesk (variable, 100-900, stylistic sets ss01 and cv11 on)
**Label/Mono Font:** JetBrains Mono (variable), with tabular figures

**Character:** Bricolage brings a slightly quirky, heavy grotesque voice to the name and headings; Hanken keeps UI text neutral and legible; the mono is reserved for the record's data.

### Hierarchy
- **Display name** (800, 3.75rem below sm, 6rem from sm, line-height 0.9, tracking -0.025em): the candidate name in the profile band only.
- **Page title** (800, 2.25rem then 3rem, line-height 1.02, balanced wrap): the h1 in the page band on Works, blog and taxonomy pages. Sits on the band in white.
- **Wordmark** (700, 1.25rem): "rohandev" in the header.
- **Panel title / row title** (600, 1.125rem, tight leading, tracking -0.025em): panel headings and each row's title, in Bricolage. Row titles turn cobalt-link on hover.
- **Lead** (400, 1.125rem, 1.625 line-height, max 65ch): the intro copy on Works.
- **Body** (400, 0.875rem/1.25rem): row descriptions (max 68ch), details values, footer text. Slate Text for secondary copy.
- **Label** (500, 0.75rem/1.25rem): chips and tags. Title case as authored, no uppercase, no letter-spacing.
- **Meta** (mono, 0.75rem, tabular numerals): dates, reading time, counts, repository addresses, breadcrumbs, "N items".
- **Caption** (Hanken 400, 0.75rem, Slate Text): plain-language notes such as "Opens on Google Drive" and "Read the write-up on this site". Sans, not mono; mono is for data.
- **Article prose**: Tailwind Typography with all prose colours mapped to the theme tokens. Blog posts use `prose-lg` (18px body) in a centred column of `min(40rem, 100%)`, which sets about 77 characters per line; the Tremis write-up uses default `prose` capped at 68ch. Headings in Bricolage, links in the link hue with a 40%-opacity underline that firms on hover.

### Named Rules
**The Data Is Mono Rule.** Only dates, IDs, counts, addresses and breadcrumbs use the mono face. Names, titles and sentences never do.

**The Two-Voice Rule.** Bricolage is for names and headings, Hanken for everything else. No third proportional face.

## Layout

A single centred container, 1152px max (max-w-6xl), 16px gutters that widen to 24px from sm. The sticky header is 56px tall. Below a full-bleed band, home is a two-column grid at lg: a fluid main column (Work samples, Writing, Activity) and a fixed 20rem aside (Details, Stack, Listening); it collapses to one column below lg. Spacing rhythm is 32px between panels, 16px vertical / 16-20px horizontal padding in rows, and 20px inside panels. The band's top padding is 40px on mobile and 56px from sm; the stage rail closes the band with 32px of bottom padding. The first rows of Work samples must begin above the fold on desktop.

The tab counts in the header hide below sm; tabs shrink their padding rather than wrap. Text measure is capped at 65-68ch. Stack is a fixed 3x3 grid at every width. Scroll padding is 5rem to clear the sticky header. Blog posts sit in a three-track grid whose centre column is `min(40rem, 100%)` with 16px inline padding; the cover image may run to 1000px.

## Elevation & Depth

Nearly flat. Depth is tonal (paper under white card) plus hairline borders. Panels carry one restrained shadow; nothing else lifts at rest.

### Shadow Vocabulary
- **Panel shadow** (`0 1px 0 hsl(222 30% 80% / 0.35), 0 8px 24px -16px hsl(228 40% 20% / 0.18)`; dark: `0 1px 0 hsl(0 0% 100% / 0.03), 0 10px 28px -18px hsl(0 0% 0% / 0.75)`): a hairline lip plus a soft, negative-spread drop, on every panel.
- **Advance ring** (`0 0 0 1px rgb(255 255 255 / 0.28), 0 6px 16px -8px hsl(158 84% 12% / 0.7)`): the one lifted control, so the Advance button reads as the action on the band.
- **Stage halo** (`0 0 0 5px rgb(255 255 255 / 0.18)`): the ring around the current-stage dot.

### Named Rules
**The Hairline First Rule.** Separate with a 1px border or divider before reaching for a shadow. New surfaces use the panel shadow or none; do not invent a second panel elevation.

## Shapes

Small, practical radii: 8px on panels and code blocks, 6px on buttons, tiles and thumbnails, 4px on chips, the focus outline and inline code, full circles only for stage dots and the status dot. The band's "R" tile is 8px; the favicon tile is a rounded square (14px on a 64px viewBox). Borders are always 1px hairline. Work thumbnails are square with a 1px border; when there is no image, a cobalt tile with the white initial or icon stands in. The header's bottom edge is a 1px hairline. The band is a flat full-bleed rectangle with no curve or angled edge.

## Components

### Buttons
- **Shape:** 6px radius, 40px tall by default, 48px on the band. Semibold 14px (16px on the band). Press nudges down 1px.
- **Resume (light):** white fill with deep-cobalt text, on the band only. Hover fills with Cobalt Mute.
- **Advance:** Advance Green fill, white text, arrow icon, with the Advance ring. Hover deepens to hsl(158 84% 22%).
- **Outline:** card fill, 1px strong hairline. Hover gets a Cobalt Wash fill and a cobalt-link border. Used for the theme toggle and social icon buttons: 40px square, icon-only (the theme toggle is 36px below sm, 40px from sm). Control borders use the strengthened `--input` hairline.
- **Primary / secondary / ghost / link (shadcn variants):** used inside blog post navigation, pagination and tags. Primary is the cobalt-link fill with white text (dark text on periwinkle in dark).
- **Focus:** global `:focus-visible` is a 2px outline in `--ring` (cobalt in light, periwinkle in dark) with 2px offset and a 4px radius. Inside `.bg-band` the outline is white (#fff), because the ring equals the band colour. The shadcn `ui/button` variants use their own 2px ring with a 2px background-coloured offset instead of the outline.

### Chips
- **Style:** 4px radius, 12px/20px text at weight 500, Fog fill with ink text. Variants: amber (status and current stage), cobalt (wash), green (live).
- **Use:** tags on rows and posts, the status in Details ("Open to projects", theme-aware amber), the "Now playing / Last played" state.
- **On the band:** the status chip is translucent white (15%) with a small green dot, not one of the fill variants.

### Cards / Containers (Panel)
- **Corner style:** 8px. **Background:** card. **Border:** 1px hairline. **Shadow:** panel shadow. **Padding:** 16px mobile, 20px from sm; row lists inside use `overflow: hidden` with dividers and a header row separated by a hairline.
- Never nest a bordered panel inside a panel; inside, use dividers and rows.

### Rows (Work and Post)
Dense, whole-row links. Work row: square thumbnail (56-64px, 80-112px on the Works page), Bricolage title with a trailing arrow (up-right for external), description, chips. The home page clamps descriptions to three lines; the Works page shows them in full with a mono repository address line (or, for the local Tremis write-up, a sans caption). Post row: mono date column (128px, hidden below sm and moved under the title), title, description, reading time, chips. Hover fills the row with Cobalt Wash and turns the title cobalt-link; the arrow shifts 2px right.

### Inputs / Fields
None in the build. There are no forms; contact is a mailto action.

### Navigation
Sticky white header, 56px, hairline bottom. Wordmark left (Bricolage bold, no mark). Tabs (Overview, Works, Blog) sit right in 14px semibold with a mono count chip (hidden below sm). Active tab is cobalt-link with a 2px underline flush to the header's bottom edge; inactive is Slate Text, going to ink on hover. Theme toggle is an outline icon button, 36px below sm and 40px from sm (moon in light, sun in dark). Sub-pages show a mono breadcrumb on the band. There is no hamburger; the three tabs fit on mobile.

### Stage Rail (signature)
A 2px track (white at 50%) along the band's bottom edge with four 20px dots: Applied, Screening, Interview, Offer. Completed stages fill white with a check; the current stage is the Stage Amber dot (scaled 1.2, with a translucent halo) and an amber label pill in bold; future stages are hollow with 55% white borders and Cobalt Mute labels. Home loads at Screening (index 1), the fill drawing in from zero. "Advance to interview" moves the rail to Interview, then after 900ms opens the prefilled mailto (immediately under reduced motion). The rail returns to Screening on window focus or after 7 seconds, because the email may never be sent. Dot fill, border and label changes ease over 300ms on the expo-out curve; the dot scale takes 500ms. It announces stage changes through a polite live region.

### Name Block (signature)
The profile band opens with a white "R" tile in band-coloured Bricolage 800, 8px radius, beside the name. Below sm the tile is 80px square and top-aligned with the name. From sm the row stretches (`items-stretch`): the tile is 116px wide (7.25rem) and fills the row height, the h1 is trimmed with negative em margins (-0.128em at sm, -0.075em below) and the subtitle carries -0.41em below, so the tile's top matches the top of the "Rohan" ink and its bottom sits on the subtitle baseline. The subtitle ("SWE at TechCrafter · BTech CSE, JSSATE") stacks role and education on two lines below sm and shows the "·" separator only from sm. Keep the tile, name and subtitle as one unit; do not re-space them independently.

### Identity Assets
The favicon set (favicon.svg, favicon.ico, 16/32 PNG, apple-touch-icon, android icons, mstile, safari-pinned-tab.svg) is a cobalt (#2440F5) tile with a white Bricolage Grotesque "R". The share images (`twitter-card.png` for home, `1200x630.png` for posts) are cobalt cards carrying the tile, name and (home only) the stage rail. The `theme-color` meta is media-aware: #2440F5 in light, #192EB8 in dark.

### Stack Tiles
A 3x3 grid, 8px gaps, of identical tiles: 1px hairline, 6px radius, paper fill, a 24px monochrome simple-icons glyph in currentColor above a 12px medium label. No brand colours, so every tile is theme-safe and equal in weight.

### Details Rail
Key-value list: label in Slate Text left, value right-aligned at medium weight, links in cobalt-link with a 30% underline, rows separated by dividers. A Resume link card follows (40px icon tile in Cobalt Wash, "Opens on Google Drive" as a sans caption).

### Activity and Listening
Activity is a 26-week contribution grid of 3px-gapped square cells stepping through Fog then 25/50/75/100% of the link hue. Listening is a compact track row with 56px artwork and a live-state chip. Both render nothing when their data is missing.

## Do's and Don'ts

### Do:
- **Do** anchor every page with a full-width cobalt band, and let the band's contents (rail, Resume, Advance) stay theme-invariant.
- **Do** use hairline borders and dividers for structure; reserve the panel shadow for panels and the Advance ring for the one action button.
- **Do** set dates, counts, IDs, URLs and breadcrumbs in JetBrains Mono with tabular numerals.
- **Do** keep icons monochrome (currentColor), including tech-stack glyphs.
- **Do** use the ease-out exponential curve `cubic-bezier(0.16, 1, 0.3, 1)` for authored motion, and honour `prefers-reduced-motion`.
- **Do** write the theme choice to localStorage under "theme" and apply it before paint; follow the system until the visitor chooses.
- **Do** lift cobalt text to periwinkle in dark and keep cobalt as a fill only on the band.
- **Do** draw focus outlines in white inside the cobalt band and in `--ring` everywhere else; keep control borders at the `--input` hairline so they hold 3:1.

### Don't:
- **Don't** open a page with a hero-plus-project-card-grid, or restyle the site as a dark bento.
- **Don't** add a logo mark to the header or next to the wordmark; the "R" tile belongs to the profile band's name block.
- **Don't** colour tech-stack icons in their brand hues.
- **Don't** introduce a fourth signal colour or use green and amber decoratively.
- **Don't** use pure black or pure white for dark-theme ground and text.
- **Don't** stack bordered panels inside panels, or add a second shadow level.
- **Don't** set body copy or headings in mono, or add a third proportional typeface.
- **Don't** hide or delay content behind entrance animation beyond the rail's own draw-in.

## Not canonized (build carries, not rules)

- Hard-coded colour outside tokens: the green status dot `#5EEAA8` on the band is a one-off. (The Resume button text now uses the `--band` token.)
- Two focus treatments coexist: the global outline and the shadcn `ui/button` ring with offset. Prefer the global outline for new controls.
