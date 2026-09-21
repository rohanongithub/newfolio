# Content inventory (must survive the redesign)

## Identity and copy

- Site title: `rohandev`
- Description (`src/consts.ts`): "my personal portfolio that showcases all my works and achievements in the form of a minimalistic UI"
- Homepage intro: "Hey there, I am Rohan. Currently an undergrad and pursuing BTech in CSE from JSSATE, Bengaluru. Open for INTERNSHIPS !! and project ideas. Feel free to drop and email and reach out."
- "FOR HIRE" status tile: now the status chip "Open to projects" (owner is employed as SWE at TechCrafter). Role line: "SWE at TechCrafter · BTech CSE, JSSATE".

## Links

- Resume (homepage): Google Drive link, now `PROFILE.resume` in `src/consts.ts`. The repo no longer holds resume PDFs; the Drive link is the only copy.
- GitHub: https://github.com/rohanongithub
- Twitter: https://twitter.com/rohxnp
- Email: rohanwith1011@gmail.com (`SocialIcons` adds the `mailto:`)
- Nav: overview `/`, works `/about`, blog `/blog`

## Content collections

- `src/content/blog/portfolio-journey/index.mdx`: "My portfolio Journey", 2025-01-31, with `2024.png`.
- `src/content/authors/rohan.md`
- `src/content/projects/aegis.md`: AEGIS, the owner's project (solo, 2026, in progress). Its tile opens `/projects/aegis`, which shows the full write-up.
- `src/content/projects/authscale.mdx`: AuthScale (solo, 2026, completed). Its tile opens `/projects/authscale`. MDX so it can embed `src/components/diagrams/AuthScaleArchitecture.astro`, an inline SVG of the AWS architecture.

## Assets

- Project covers: none yet (cover-authscale.png and the AEGIS cover are still to come). Add files under `src/assets/projects/` and set `image:` in the project's frontmatter.
- Carousel images (sunset, lantern): removed from the site at the owner's request; still in git history.
- Blog screenshots: `public/images/blog-images/portfolio-journey-images/`
- Tech-stack icons: replaced by monochrome `simple-icons` glyphs (Docker, AWS, JavaScript, Node.js, Express, PostgreSQL, Python, Axios, Git); the old colour SVGs were deleted.
- Social and PWA: favicons, `site.webmanifest`, `twitter-card.png`, `1200x630.png`

## Live features

- GitHub contribution heatmap (`src/scripts/github.ts`, needs `ACCESS_TOKEN`)
- RSS (`/rss.xml`), sitemap, robots

## Not available (do not fabricate)

Testimonials, employers, metrics, awards, analytics, project claims beyond the content files.
