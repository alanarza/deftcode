import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
})

const projectSchema = z.object({
  translationKey: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  industry: z.string(),
  featured: z.boolean().default(false),
  order: z.number(),
  website: z.string().url().optional(),
  services: z.array(z.string()),
  capabilities: z.array(z.string()),
  stack: z.array(z.object({ name: z.string(), role: z.string() })),
  challenge: z.string(),
  solution: z.string(),
  architecture: z.string(),
  results: z.array(z.string()),
  hero: imageSchema,
  gallery: z.array(imageSchema).default([]),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
})

const siteSchema = z.object({
  hero: z.object({ eyebrow: z.string(), title: z.string(), description: z.string() }),
  services: z.array(z.object({ title: z.string(), description: z.string(), items: z.array(z.string()) })),
  capabilities: z.array(z.object({ title: z.string(), description: z.string() })),
  principles: z.array(z.object({ title: z.string(), description: z.string() })),
})

export default defineContentConfig({
  collections: {
    projectsEs: defineCollection({ type: 'page', source: 'projects/es/*.md', schema: projectSchema }),
    projectsEn: defineCollection({ type: 'page', source: 'projects/en/*.md', schema: projectSchema }),
    siteEs: defineCollection({ type: 'data', source: 'site/es/*.yml', schema: siteSchema }),
    siteEn: defineCollection({ type: 'data', source: 'site/en/*.yml', schema: siteSchema }),
  },
})
