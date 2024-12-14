import * as z from 'zod'

export const productAttributeDto = z.object({
  type: z.string({ required_error: 'Không được để trống' }),
  name: z.string({ required_error: 'Không được để trống' }),
  name_en: z.string({ required_error: 'Không được để trống' }),
})

export type ProductAttributeDto = z.infer<typeof productAttributeDto>
