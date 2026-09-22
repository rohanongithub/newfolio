export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_WORKS_ON_HOMEPAGE: number
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'rohandev',
  DESCRIPTION:
    'Rohan, SWE at TechCrafter, open to projects. Selected work, writing and resume.',
  EMAIL: 'rohanwith1011@gmail.com',
  // Homepage rules: at most 2 works and 1 recent post. The full lists live on /about and /blog.
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_POSTS_ON_HOMEPAGE: 1,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://rohandev.online/',
}

export const PROFILE = {
  name: 'Rohan',
  role: 'SWE at TechCrafter',
  employer: 'TechCrafter',
  education: 'BTech CSE, JSSATE',
  location: 'Bengaluru, India',
  status: 'Open to projects',
  resume:
    'https://drive.google.com/file/d/1cAXmy6-sX1liTy03X3PgP7f68ge68oiH/view?usp=sharing',
} as const

export const INTERVIEW_MAILTO = `mailto:${SITE.EMAIL}?subject=${encodeURIComponent(
  'Interview request',
)}&body=${encodeURIComponent(
  "Hi Rohan,\n\nI came across your portfolio and would like to set up an interview.\n\nRole:\nCompany:\nTimes that work:\n\nThanks,",
)}`

export const NAV_LINKS: Link[] = [
  { href: '/', label: 'overview' },
  { href: '/about', label: 'works' },
  { href: '/blog', label: 'blog' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/rohanongithub', label: 'GitHub' },
  { href: 'https://twitter.com/rohxnp', label: 'Twitter' },
  { href: 'rohanwith1011@gmail.com', label: 'Email' },
]

// Visitor card counter (abacus.jasoncameron.dev). Hit once per browser; the name is never sent.
export const CARD = {
  counterUrl: 'https://abacus.jasoncameron.dev',
  counterNamespace: 'rohandev-vercel-app',
  counterKey: 'cards',
  counterTimeoutMs: 4000,
} as const
