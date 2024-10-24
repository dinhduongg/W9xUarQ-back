import * as z from 'zod'

export const loginDto = z.object({
  email: z.string({ required_error: 'Không được bỏ trống' }).email({ message: 'Email không hợp lệ' }),
  password: z.string({ required_error: 'Không được bỏ trống' }),
})

export type LoginDto = z.infer<typeof loginDto>
