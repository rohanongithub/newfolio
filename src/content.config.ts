import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string(),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number().default(999),
      description: z.string(),
      tags: z.array(z.string()),
      image: image().optional(),
      role: z.string().optional(),
      year: z.number().optional(),
      status: z.string().optional(),
    }),
})

const art = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().optional(),
      medium: z.string().default('Procreate'),
      image: image(),
      alt: z.string(),
      order: z.number().default(999),
      note: z.string().optional(),
      timelapse: z.string().optional(),
    }),
})

export const collections = { authors, projects, art }
