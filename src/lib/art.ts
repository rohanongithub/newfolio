import { getCollection } from 'astro:content'

export type Piece = {
  id: string
  title: string
  year?: number
  medium: string
  image: ImageMetadata
  alt: string
  note?: string
  timelapse?: string
}

/** Art in display order (`order` in each file's frontmatter). */
export async function getArt(): Promise<Piece[]> {
  const entries = (await getCollection('art')).sort(
    (a, b) => a.data.order - b.data.order,
  )
  return entries.map((entry) => ({ id: entry.id, ...entry.data }))
}
