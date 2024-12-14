import { GlobalQuery } from 'src/common/types/global.type'
import * as z from 'zod'

export const createProductDto = z.object({
  name: z.string({ required_error: 'Tên không được để trống' }),
  name_en: z.string({ required_error: 'Tên không được để trống' }),
  category_id: z.string({ required_error: 'Danh mục không được để trống' }),
  image_url: z.string().optional().nullable(),
  custom_slug: z.boolean().default(false),
  slug: z.string().optional().nullable(),
})

export const updateProductDto = z.object({
  // group name
  is_update_name: z.boolean().default(false), // để nhận biết có phải update name không
  custom_slug: z.boolean().default(false), // để nhận biết có phải slug tạo bởi người dùng không
  name: z.string().optional().nullable(),
  name_en: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),

  // group mô tả
  description: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  additional_description: z.string().optional().nullable(),
  additional_description_en: z.string().optional().nullable(),

  // group seo title
  meta_title: z.string().optional().nullable(),
  meta_title_en: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  meta_description_en: z.string().optional().nullable(),

  // group khác
  hot: z.boolean().optional().nullable(),
  unique_price: z.boolean().optional().nullable(),
})

export type CreateProductDto = z.infer<typeof createProductDto>
export type UpdateProductDto = z.infer<typeof updateProductDto>

export interface ProductQuery extends GlobalQuery {
  category_id: string
  product_id: string
}
