import * as z from 'zod'

export const slideSchema = z.object({
  name: z.string(),
  url: z.string().nullable(),
  image_url: z.string(),
  enable: z.boolean(),
  platform: z.number(),
  sorted: z.number().nullable(),
})

export type SlideSchemaType = z.infer<typeof slideSchema>
