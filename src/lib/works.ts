import { getCollection } from 'astro:content'

export type Work = {
  name: string
  description: string
  tags: string[]
  href: string
  external: boolean
  image?: ImageMetadata
  icon?: string
}

// Tremis lives on its own page rather than in the projects collection.
const TREMIS: Work = {
  name: 'Tremis',
  description:
    'An open-source, in-memory database in Go, modelled on Redis, for small-scale projects like leaderboards and chat apps.',
  tags: ['Go', 'In-memory DB', 'Open source'],
  href: '/projects/tremis',
  external: false,
  icon: 'lucide:database',
}

export async function getWorks(): Promise<Work[]> {
  const projects = await getCollection('projects')
  return [
    TREMIS,
    ...projects.map((project) => ({
      name: project.data.name,
      description: project.data.description,
      tags: project.data.tags,
      href: project.data.link,
      external: true,
      image: project.data.image,
    })),
  ]
}
