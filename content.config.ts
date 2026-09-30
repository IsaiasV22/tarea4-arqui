// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    movies: defineCollection({
      type: 'data',
      source: 'movies.csv',
      schema: z.object({
        rank: z.number(),
        name: z.string(),
        year: z.number(),
        rating: z.number(),
        genre: z.string(),
        certificate: z.string(),
        run_time: z.string(),
        tagline: z.string(),
        budget: z.string(),
        box_office: z.string(),
        casts: z.string(),
        directors: z.string(),
        writers: z.string()
      })
    })
  }
})
