# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers, plus anyone with a project to hand him. Rohan is currently employed as SWE at TechCrafter and is open to projects (owner's update, 2026-09-21); the site's hiring-pipeline wording ("Advance to interview") was deliberately kept by the owner. They skim fast, judge in seconds, and want to reach the resume or make contact.

Secondary (unconfirmed, do not design for first): engineers and peers who read the blog and projects in depth.

## Product Purpose

A personal portfolio for Rohan, SWE at TechCrafter (BTech CSE, JSSATE, Bengaluru), that shows his work and gets project enquiries sent to him. Success: a recruiter understands who he is, sees proof of what he has built, and opens the resume or emails him.

## Positioning

The site is a working developer's own site, not a template. It carries real projects, a blog, and live signals of activity (GitHub contributions, what he is listening to). Which of these signals survive is a design decision, not a product commitment.

## Operating Context

- Static site deployed to Vercel (`rohandev.vercel.app`).
- Content lives in Astro content collections: `blog`, `authors`, `projects`.
- The resume lives on Google Drive only (`PROFILE.resume` in `src/consts.ts`); the repo holds no resume PDFs.

## Capabilities and Constraints

- Stack: Astro 5 (static output), React 18 islands, Tailwind 3, shadcn/ui (Radix). Stays as is.
- Routes that exist and must keep working: `/`, `/about` (labelled "works" in the nav), `/blog` (paginated), `/blog/[id]`, `/authors`, `/authors/[id]`, `/tags`, `/tags/[id]`, `/projects/tremis`, `/404`, `/rss.xml`, `/robots.txt`.
- Build is `astro check && astro build`; it must pass.
- The GitHub contribution tile needs `ACCESS_TOKEN` in `.env` at build time. The last.fm tile fetches client-side from a third-party endpoint.
- Decided by the owner: the production domain is `https://rohandev.vercel.app`, and the Google Drive link is the canonical resume. The projects section is going to be replaced by the owner later; treat it as placeholder content and do not edit it.

## Brand Commitments

- Name: Rohan; site title `rohandev`.
- Handles: GitHub `rohanongithub`, Twitter `rohxnp`.
- Status line to preserve: "Open to projects". Current role: SWE at TechCrafter.
- The old look (black bento, pixel fonts, dark-only) was replaced at the owner's request and is not binding.

## Evidence on Hand

- One blog post: "My portfolio Journey" (2025-01-31), with screenshots.
- Project logos in `public/project-logos/` (rohandev, weatherapp, lumen, and numbered SVGs); `src/content/projects/project-a|b|c.md` are real projects (First Portfolio, LumenAI, Rohan4Casts).
- A `/projects/tremis` stub ("An in-memory database").
- Branded share images (`public/static/twitter-card.png`, `1200x630.png`) and an avatar (`public/avatar.svg`).
- Absent, so must not be fabricated: testimonials, customer or employer names, metrics, awards, analytics, and any project claims not in the content files.

## Product Principles

1. The resume and contact action are one glance away on every page.
2. Proof beats adjectives: show real projects, writing, and activity rather than describing skill.
3. Nothing is invented. Copy, links, and claims come from what Rohan has published or confirms.
4. Fast to scan on a phone; a recruiter may open the link from a message.
5. Existing routes, content collections, and RSS keep working through the redesign.

## Accessibility & Inclusion

No product-specific requirement was established. Baseline: WCAG AA contrast, keyboard-reachable navigation, visible focus, and respect for `prefers-reduced-motion`.
