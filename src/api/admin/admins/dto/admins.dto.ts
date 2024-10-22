import * as z from 'zod'

export const adminDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  email: z.string({ required_error: 'Không được để trống' }).email({ message: 'Email không hợp lệ' }),
  password: z.string({ required_error: 'Không được để trống' }),
})

export const updateDto = z.object({
  name: z.string().optional(),
  avatar: z.string().nullable().optional(),
  is_enable: z.boolean().optional(),
})

export const changePasswordDto = z.object({
  password: z.string({ required_error: 'Không được để trống' }),
})

export type AdminDto = z.infer<typeof adminDto>
export type UpdateDto = z.infer<typeof updateDto>
export type ChangePasswordDto = z.infer<typeof changePasswordDto>
