import { getCollection } from 'astro:content'

export type Work = {
  id: string
  name: string
  description: string
  tags: string[]
  image?: ImageMetadata
  role?: string
  year?: number
  status?: string
}

/** Projects in display order (`order` in each project's frontmatter). */
export async function getWorks(): Promise<Work[]> {
  const entries = (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order,
  )
  return entries.map((entry) => ({
    id: entry.id,
    name: entry.data.name,
    description: entry.data.description,
    tags: entry.data.tags,
    image: entry.data.image,
    role: entry.data.role,
    year: entry.data.year,
    status: entry.data.status,
  }))
}
