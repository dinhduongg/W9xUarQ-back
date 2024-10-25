import * as z from 'zod'

export const informationDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  name_en: z.string({ required_error: 'Không được để trống' }),
  description: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  meta_description_en: z.string().nullable().optional(),
})

export type InformationDto = z.infer<typeof informationDto>
