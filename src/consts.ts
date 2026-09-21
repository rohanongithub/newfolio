export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
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
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 3,
  SITEURL: 'https://rohandev.vercel.app/',
}

export const PROFILE = {
  name: 'Rohan',
  role: 'SWE at TechCrafter',
  education: 'BTech CSE, JSSATE',
  location: 'Bengaluru, India',
  status: 'Open to projects',
  resume:
    'https://drive.google.com/file/d/1dXYXm7TASKVVckqT2JaPkzaetEVp2z0s/view?usp=sharing',
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
