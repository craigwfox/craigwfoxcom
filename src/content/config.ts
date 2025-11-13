import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

function getYear(startDate: Date, endDate: Date) {
  const fullDate = endDate ? endDate : startDate
  return new Date(fullDate).getFullYear()
}

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    postSlug: z.string(),
    image: z.string().nullable().optional(),
    ogImage: z.string().nullable().optional(),
    ogImageAlt: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
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

const reading = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().nullable(),
      storyGraph: z.string().nullable().optional(),
      goodReads: z.string().nullable().optional(),
      readType: z.string().nullable().optional(),
      owned: z.boolean().nullable().optional(),
      ratingBook: z.coerce.number().nullable().optional(),
      startDate: z
        .string()
        .nullable()
        .or(z.date())
        .optional(),
      endDate: z
        .string()
        .nullable()
        .or(z.date())
        .optional(),
      isbn: z
        .string()
        .nullable()
        .optional()
        .transform(val => val?.trim()),
      author: z
        .union([z.array(z.string()), z.string()])
        .nullable()
        .optional(),
      publisher: z.string().nullable().optional(),
      publishDate: z
        .string()
        .nullable()
        .or(z.date())
        .transform(val => new Date(val)),
      pageCount: z.coerce.number().optional(),
      bookType: z.string().nullable().optional(),
      genres: z.array(z.string()).nullable().optional(),
      Finished: z.string().nullable().optional(),
    }),
})

export const collections = { blog, hiking, reading }
