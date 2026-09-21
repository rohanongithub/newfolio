---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/about.astro","src/pages/blog"]
---

---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/about.astro","src/pages/blog"]
---

# Surface brief: portfolio site (home + works + blog + taxonomy)

## Scope and mode
Whole site. Home and Works are Persuade (recruiter acts: resume, email). Blog and post pages are Read. Taxonomy pages inherit the same shell.

## Audience, job, action
Recruiters and hiring managers skimming for candidates, or with a project to offer. Job: decide in seconds, then open the resume or email Rohan. Proof on hand: two projects so far (AEGIS and AuthScale, each opening its own page), one blog post, GitHub activity, a Google Drive resume. Nothing else may be claimed.

## Chosen direction
Hiring Pipeline (assigned alternate chosen from the round: IMPECCABLE'S PICK). The site is a candidate record inside an applicant-tracking tool. Memorable moment: "Advance to interview" slides the stage marker from Screening to Interview, then opens a prefilled email.

## Unresolved
Production domain; canonical resume link; whether to keep the GitHub heatmap when no build token exists.

## Direction contract

THESIS: The portfolio is the recruiter's own tool: Rohan's candidate record, already in Screening, with the work attached and one honest action. It refuses the hero-plus-project-card-grid and the dark bento.

OWN-WORLD: Cobalt (#2340F5) owns the profile band and the stage rail; ground is cool paper-white with hairline-bordered panels and data rows, ink #0E1220. Advance is signal green, Screening is an amber chip. Stack is a uniform grid of monochrome icon tiles. Type: Bricolage Grotesque for name and headings, Hanken Grotesk for UI, JetBrains Mono only for dates, IDs and tabular data. Components: stage stepper, tab bar with counts, status chips, dense rows, Details key-value rail, activity timeline. Light and dark themes (dark added at the owner's request after the first review): dark is an ink-navy ground tinted toward cobalt, the band deepens, links and the active tab lift to periwinkle. Theme follows the system until the visitor toggles; the choice persists.

STORY: The visitor understands in seconds who Rohan is (SWE at TechCrafter, BTech CSE, JSSATE), sees real work attached below, and believes he is capable. They open the resume or advance him to interview by email.

FIRST VIEWPORT: Top bar: wordmark left (no logo mark), tabs and theme toggle right (Overview, Works, Blog). Below, a full-width cobalt band: initials tile and the name at display scale left, status chip "Open to projects", the four-stage rail along the band's bottom edge with Screening lit, and at right the white Resume button plus the green Advance to interview button. Under the band the first rows of Work samples begin above the fold.

FORM: Applicant-tracking candidate record (my own list, position 1, top-ranked pick; seed key 5f4b663a). Pipeline stage as the signature: the rail moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
