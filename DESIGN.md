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
- One signature component (the four-stage rail) and two authored motion moments: the rail, and the theme reveal from the toggle. Everything else that moves is small feedback.
- Monochrome icons throughout; the Stack grid uses currentColor glyphs, never brand colours.
- Identity is a name, not a logo: the header carries only the "rohandev" wordmark. The one mark is a white "R" tile beside the name in the profile band, echoed as the favicon and on the share cards.

## Colors

A cool paper-and-ink palette with one saturated cobalt, one signal green and one amber. HSL triples in `src/styles/global.css` are the source of truth; the values above are those triples.

### Primary
- **Cobalt Band** (hsl(232 91% 55%)): the band background on every page and the cobalt link, active-tab and selected-state hue in light theme. In dark, the band deepens to **Night Band** (hsl(232 76% 41%)) and text/selected state lifts to **Periwinkle Link** (hsl(231 100% 76%)), because saturated cobalt fails as text on the navy ground. The band token and the link token are separate variables that coincide in light and diverge in dark.
- **Cobalt Mute** (hsl(232 100% 92%)): secondary text on the band (subtitles, breadcrumbs, inactive stage labels) and the Resume button hover. The Resume button's own text takes the band token (`--band`), so it follows the band in both themes.
- **Cobalt Wash** (hsl(232 100% 96%)) with **Cobalt Wash Ink** (hsl(232 80% 36%)): row hover, outline-button hover, the cobalt chip. Dark equivalents are Night Wash and Night Wash Ink.

### Secondary
- **Advance Green** (hsl(158 84% 26%)): the Advance button; also added lines in code diffs. Deepens on hover to hsl(158 84% 22%). Dark uses hsl(158 72% 28%) with white text.

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
- **Article prose**: Tailwind Typography with all prose colours mapped to the theme tokens. Blog posts use `prose-lg` (18px body) in a centred column of `min(40rem, 100%)`, which sets about 77 characters per line; project write-ups on the Works page use default `prose` capped at 68ch inside the project panel. Headings in Bricolage, links in the link hue with a 40%-opacity underline that firms on hover.

### Named Rules

**The Even Breaks Rule.** Headings use `text-wrap: balance` and running text `text-wrap: pretty` (global base rules), so no heading ends on a lone word and narrow phone layouts avoid orphans.

**The Data Is Mono Rule.** Only dates, IDs, counts, addresses and breadcrumbs use the mono face. Names, titles and sentences never do.

**The Two-Voice Rule.** Bricolage is for names and headings, Hanken for everything else. No third proportional face.

## Layout

A single centred container, 1152px max (max-w-6xl), 16px gutters that widen to 24px from sm. The sticky header is 56px tall. Below a full-bleed band, home is a two-column grid at lg: a fluid main column (Work samples, Writing, Activity) and a fixed 20rem aside (Details, Stack, Claim Yours); it collapses to one column below lg. The home page shows at most two works and one post (`SITE.NUM_WORKS_ON_HOMEPAGE`, `NUM_POSTS_ON_HOMEPAGE`). From lg the two columns are equal height and the last panel in each stretches so the bottoms of Activity and Claim Yours align exactly: the Claim button sits at the bottom of its panel, the Stack panel keeps its natural height (no blank space under it), and the heatmap cells stay near square. Spacing rhythm is 32px between panels, 16px vertical / 16-20px horizontal padding in rows, and 20px inside panels. The band's top padding is 40px on mobile and 56px from sm; the stage rail closes the band with 32px of bottom padding. The first rows of Work samples must begin above the fold on desktop.

Phone rules: article text is 16px with 1.65 leading and tighter list gaps below sm (18px from sm); "On this page" starts collapsed below 640px; home Work rows show three tags plus a "+N" chip below sm; touch devices get a pressed state (`:active`) on rows and buttons because hover is gated, and a soft blue tap highlight; the page uses `viewport-fit=cover`, so the container, footer, back-to-top button and dialog respect the safe-area insets. The tab counts in the header hide below sm; tabs shrink their padding rather than wrap. Text measure is capped at 65-68ch. Stack is one row of three tiles at every width. Scroll padding is 5rem to clear the sticky header. Blog posts sit in a three-track grid whose centre column is `min(40rem, 100%)` with 16px inline padding; the cover image may run to 1000px.

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
- **Primary (`.btn-primary`):** link-hue fill with white text (dark text on periwinkle in dark), used for Claim, Get card and Download PNG. Hover softens to 88% opacity.
- **Primary / secondary / ghost / link (shadcn variants):** used inside blog post navigation, pagination and tags. Primary is the cobalt-link fill with white text (dark text on periwinkle in dark).
- **Focus:** global `:focus-visible` is a 2px outline in `--ring` (cobalt in light, periwinkle in dark) with 2px offset and a 4px radius. Inside `.bg-band` the outline is white (#fff), because the ring equals the band colour. The shadcn `ui/button` variants use their own 2px ring with a 2px background-coloured offset instead of the outline.

### Chips
- **Style:** 4px radius, 12px/20px text at weight 500, Fog fill with ink text. Variants: amber (status and current stage), cobalt (wash), green (live).
- **Use:** tags on rows and posts, the status in Details ("Open to projects", theme-aware amber).
- **On the band:** the status chip is translucent white (15%) with a small green dot, not one of the fill variants.

### Cards / Containers (Panel)
- **Corner style:** 8px. **Background:** card. **Border:** 1px hairline. **Shadow:** panel shadow. **Padding:** 16px mobile, 20px from sm; row lists inside use `overflow: hidden` with dividers and a header row separated by a hairline.
- Never nest a bordered panel inside a panel; inside, use dividers and rows.

### Rows (Work and Post)
Dense rows. Work rows are whole-row links to the project's own page (`/projects/[id]`), with a small arrow after the title that shifts 2px right on hover: square thumbnail (56-64px, 80-112px on the Works page; a cobalt letter tile when no cover image exists), Bricolage title with an optional status chip, an optional mono role and year line on the Works page, description, chips. The home page clamps descriptions to three lines; the Works page shows them in full inside one "All works" panel. The project page uses the blog reading layout: the band carries the title, description, status chip, role and year and tags; the body is `prose-lg` in a 40rem column with the sticky "On this page" rail on wide screens, and previous and next project links at the end. Post row: mono date column (128px, hidden below sm and moved under the title), title, description, reading time, chips. On rows (work and post), hover fills the row with Cobalt Wash and turns the title cobalt-link.

### Architecture Diagram
Inline SVG figure for project write-ups (`src/components/diagrams/`), drawn on a narrow 300-unit canvas so its 12px labels stay legible on phones (about 15px on desktop, at most 380px wide). Every colour is a theme token, so it follows light and dark: key nodes use Cobalt Wash fill with the link-hue stroke and Wash Ink text, plain nodes the page ground with the strong hairline, flow arrows the link hue at 1.5px, monitoring a dotted muted line, and grouping boundaries dashed strong hairlines with muted labels. It sits directly on the panel (no card around it), carries an `aria-labelledby` title and description, and a caption that explains the line styles in theme-neutral words.

### Motion
Shared tokens live in `:root`: `--ease-out-expo` (cubic-bezier(0.16, 1, 0.3, 1), for arrivals), `--ease-reveal` (cubic-bezier(0.4, 0, 0.2, 1), for the full-screen reveal only), `--dur-fast` 150ms, `--dur-base` 250ms and `--dur-reveal` 650ms. Every effect has a reduced-motion path and content is visible without JavaScript.
- **Theme reveal.** The new theme grows as a circle from the centre of the toggle button (View Transitions API, 650ms), the same in both directions; the moon and sun swap with a 250ms rotate and scale. It is scoped to `html.theme-reveal` so page-navigation transitions are untouched. `--ease-reveal` is used because out-expo would cover most of the screen in about 130ms and read as a flash. No support or reduced motion means an instant switch; a second click skips the running transition. The token is read with its unit (the minifier rewrites 650ms as .65s), and the animation uses `fill: forwards` so the clip does not snap back before the transition ends.
- **Reading progress.** A 2px line in the link hue on the header's bottom hairline, driven by a CSS scroll timeline on post and project pages; hidden where scroll timelines are unsupported. It is a readout of scroll position, so it stays under reduced motion.
- **Copy email.** A 32px icon button beside the email in Details; the copy icon swaps to a check for 1.6s (150ms) and a polite live region says "Email address copied". Reduced motion keeps the swap, without the easing.
- **Claim card.** The dialog fades and rises 8px over 250ms; a fresh card settles in over 350ms (from 97% with a slight tilt, out-expo); the Shuffle icon turns once per click (350ms); the preview tilt eases over 250ms. Reduced motion removes the tilt and the fades.
- **Nav underline.** One 2px element springs from the previous tab to the active one (underdamped, about 0.45 damping ratio: a single overshoot and rebound, settling in roughly 600ms; the width lags the position slightly so the bar stretches). It starts where the old underline ended because the header is re-rendered on each navigation. Reduced motion jumps straight to the tab; without JS a static underline on the active link is shown.
- **Activity trail.** With a mouse or pen, cells under the pointer light in the link hue with a soft glow and fade over about 1.1s (smoothstep tail), following the path even when the pointer moves fast. Off for touch and reduced motion.
- **Diagram draw.** The AuthScale architecture draws itself once when scrolled to, in about 1.3s: boundaries, then each line and node in the order requests travel, with arrowheads arriving as lines land. The script arms the hidden start state only when the figure is below the fold and motion is allowed; otherwise it is static and complete.

### Back to Top
A 40px outline icon button (6px radius, up arrow) fixed bottom-right (16px mobile, 24px from sm). It fades and rises in after about 1.5 screens of scrolling, hides while the footer is on screen so it never covers the footer icons, and does not exist on short pages. Click scrolls to the top (instant under reduced motion) and moves focus to `main` so keyboard users continue from the top.

### Inputs / Fields
One field, in the Claim Yours dialog: "Good Name", a 44px-tall text input (16px text so phones do not zoom), 6px radius, the strong `--input` hairline, page-ground fill; invalid state is a destructive border with a message below, and the error clears on typing. Contact elsewhere is a mailto action.

### Navigation
Sticky white header, 56px, hairline bottom. Wordmark left (Bricolage bold, no mark). Tabs (Overview, Works, Blog) sit right in 14px semibold with a mono count chip (hidden below sm). Active tab is cobalt-link with a 2px underline flush to the header's bottom edge, which springs between tabs (see Motion); inactive is Slate Text, going to ink on hover. Theme toggle is an outline icon button, 36px below sm and 40px from sm (moon in light, sun in dark). Sub-pages show a mono breadcrumb on the band. There is no hamburger; the three tabs fit on mobile.

### Stage Rail (signature)
A 2px track (white at 50%) along the band's bottom edge with four 20px dots: Applied, Screening, Interview, Offer. Completed stages fill white with a check; the current stage is the Stage Amber dot (scaled 1.2, with a translucent halo) and an amber label pill in bold; future stages are hollow with 55% white borders and Cobalt Mute labels. Home loads at Screening (index 1), the fill drawing in from zero. "Advance to interview" moves the rail to Interview, then after 900ms opens the prefilled mailto (immediately under reduced motion). The rail returns to Screening on window focus or after 7 seconds, because the email may never be sent. Dot fill, border and label changes ease over 300ms on the expo-out curve; the dot scale takes 500ms. It announces stage changes through a polite live region. The fill-in intro plays on a fresh load or reload; on a client-side return to Home it arrives already settled (`html[data-rail-seen]`, set before paint).

### Name Block (signature)
The profile band opens with a white "R" tile in band-coloured Bricolage 800, 8px radius, beside the name. Below sm the tile is 80px square and top-aligned with the name. From sm the row stretches (`items-stretch`): the tile is 116px wide (7.25rem) and fills the row height, the h1 is trimmed with negative em margins (-0.128em at sm, -0.075em below) and the subtitle carries -0.41em below, so the tile's top matches the top of the "Rohan" ink and its bottom sits on the subtitle baseline. The subtitle ("SWE at TechCrafter · BTech CSE, JSSATE") stacks role and education on two lines below sm and shows the "·" separator only from sm. Keep the tile, name and subtitle as one unit; do not re-space them independently.

### Identity Assets
The favicon set (favicon.svg, favicon.ico, 16/32 PNG, apple-touch-icon, android icons, mstile, safari-pinned-tab.svg) is a cobalt (#2440F5) tile with a white Bricolage Grotesque "R". The share images (`twitter-card.png` for home, `1200x630.png` for posts) are cobalt cards carrying the tile, name and (home only) the stage rail. The `theme-color` meta follows the site's theme, not just the OS: #2440F5 in light, #192EB8 in dark, switched by `syncThemeColor` (Head.astro) on load, navigation and every toggle. Project share cards (`public/static/og/<id>.png`, from `npm run og`) use the same cobalt style with the tile, wordmark, project name, role, year, status chip and up to five tags.

### Stack Tiles
One row of three identical tiles (Docker, AWS, Node.js), 8px gaps: 1px hairline, 6px radius, paper fill, a 24px monochrome simple-icons glyph in currentColor above a 12px medium label. No brand colours, so every tile is theme-safe and equal in weight.

### Claim Yours and the Visitor Card
A panel at the foot of the aside: title, two lines of text and one Claim button, nothing else. Claim opens a centred native `<dialog>` (26rem max, 8px radius, cobalt-tinted shadow, dimmed backdrop, focus trapped, Esc and backdrop click close, focus returns to Claim). Step one asks for the Good Name; step two shows the card with Shuffle, Download PNG and Change name. The name is cleaned (control characters and repeated spaces removed, 24 characters) and never leaves the browser.
- **Card.** Drawn on a 1200x1800 canvas (2:3) with 36px corners left transparent in the PNG. A large art block (one of horizon, orbit rings, layered ridges, dome), the name in Bricolage 800 (shrinks, or wraps to two lines), a mono caption ("CALM EXPLORER"), an outlined info strip (Earth, hatched cell, date and time in IST), "DOWNLOADED FROM rohandev.vercel.app" with the R tile, and two or three round worn-ink stamps in random places, never over the name. The pill on the art shows "VISITOR No. N" from the counter, or "CARD ID xxxx" when the counter is unreachable (no invented rank).
- **Colour.** Every card draws a new base hue kept at least 24 degrees from the last six (stored in `localStorage`), one of five schemes, a tinted paper ground (about one in seven is deep), and ink chosen for at least 4.5:1 (the name is above 11:1). The card is a generated artifact, so it does not follow the site theme.
- **Holo.** About one card in four gets baked-in rainbow foil, micro-lines and glints over the art and frame. The preview also tilts up to 5 degrees with a moving sheen on desktop pointers; touch and reduced motion get a still card.
- **Download.** PNG named `rohandev-card-<name>.png`; on phones the share sheet is used when available so "Save Image" works.

### Details Rail
Key-value list: label in Slate Text left, value right-aligned at medium weight, links in cobalt-link with a 30% underline, rows separated by dividers. A Resume link card follows (40px icon tile in Cobalt Wash, "Opens on Google Drive" as a sans caption).

### Activity
The activity panel is a 26-week contribution grid of 3px-gapped square cells stepping through Fog then 25/50/75/100% of the link hue. It renders nothing when its data is missing.

## Do's and Don'ts

### Do:
- **Do** anchor every page with a full-width cobalt band, and let the band's contents (rail, Resume, Advance) stay theme-invariant.
- **Do** use hairline borders and dividers for structure; reserve the panel shadow for panels and the Advance ring for the one action button.
- **Do** set dates, counts, IDs, URLs and breadcrumbs in JetBrains Mono with tabular numerals.
- **Do** keep icons monochrome (currentColor), including tech-stack glyphs.
- **Do** keep browser surfaces themed: selected text on the band is white with cobalt text, row focus rings are drawn inside the row (rows live in overflow-hidden panels), and every hover style applies only where a real hover exists so taps do not leave rows highlighted.
- **Do** use the shared motion tokens (out-expo for arrivals, `--ease-reveal` for the theme reveal) and honour `prefers-reduced-motion`. Check the timing token's unit if it is read in JavaScript.
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
