import * as z from 'zod'

export const roleDto = z.object({
  code: z.string({ required_error: 'Không được để trống' }),
  description: z.string().nullable().optional(),
})

export type RoleDto = z.infer<typeof roleDto>
