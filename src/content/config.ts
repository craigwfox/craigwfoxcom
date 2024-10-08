import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    postSlug: z.string(),
    image: z.string(),
    ogImage: z.string(),
    ogImageAlt: z.string(),
    categories: z.array(z.string()).optional(),
    codepenScripts: z.array(z.string()).optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform(str => (str ? new Date(str) : undefined)),
  }),
})

const hiking = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    postSlug: z.string(),
    categories: z.array(z.string()).optional(),
    type: z.string(),
    trail: z.string(),
    location: z.array(z.string()),
    difficulty: z.string(),
    parkWebsite: z.string(),
    allTrails: z.string(),
    noSingle: z.boolean().optional(),
    miles: z.number().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform(str => (str ? new Date(str) : undefined)),
  }),
})

export const collections = { blog, hiking }
