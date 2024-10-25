import * as z from 'zod'

export const categoriesDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  name_en: z.string({ required_error: 'Không được để trống' }),
  level: z.number({ required_error: 'Không được để trống' }),
  image_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  parent: z.string().nullable().optional(),
  sorted: z.number().nullable().optional(),
})

export type CategoriesDto = z.infer<typeof categoriesDto>
