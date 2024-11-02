import * as z from 'zod'

export const dashboardDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  parent_id: z.number().nullable().optional(),
  role: z
    .object({
      _id: z.string().nullable().optional(),
      code: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  url: z.string().nullable().optional(),
  icon: z.string({ required_error: 'Không được để trống' }),
  sorted: z.number().nullable().optional(),
  notification: z.string().nullable().optional(),
  check_role: z.boolean().nullable().optional(),
  enabled: z.boolean().nullable().optional(),
})

export type DashboardDto = z.infer<typeof dashboardDto>
