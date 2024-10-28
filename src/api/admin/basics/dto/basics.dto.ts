import * as z from 'zod'

export const basicDto = z.object({
  shell: z.string({ required_error: 'Không được để trống' }),
  name: z.string({ required_error: 'Không được để trống' }),
  name_en: z.string().optional().nullable(),
  enabled: z.boolean().optional().nullable(),
  plant_text: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  group_basic: z.object(
    {
      _id: z.string().optional().nullable(),
      number: z.number().optional().nullable(),
      name: z.string().optional().nullable(),
    },
    { required_error: 'Không được để trống' },
  ),
})

export type BasicDto = z.infer<typeof basicDto>
