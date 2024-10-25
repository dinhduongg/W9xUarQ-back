import * as z from 'zod'

export const pageDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  content: z.string({ required_error: 'Không được để trống' }),
  information: z.string({ required_error: 'Không được để trống' }),
  name_en: z.string().optional().nullable(),
  content_en: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_description_en: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  sorted: z.number().optional().nullable(),
})

export type PageDto = z.infer<typeof pageDto>
