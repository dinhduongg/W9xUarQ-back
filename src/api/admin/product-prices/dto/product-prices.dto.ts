import * as z from 'zod'

export const productPriceDto = z
  .object({
    unique_price: z.boolean().default(true),
    price: z.number().optional().nullable(),
    variant: z
      .object({
        attributes: z
          .array(
            z.object({
              type: z.string().optional().nullable(),
              name: z.string().optional().nullable(),
              name_en: z.string().optional().nullable(),
              value: z.string().optional().nullable(),
              value_en: z.string().optional().nullable(),
            }),
          )
          .optional()
          .nullable(),
        price: z.number().optional().nullable(),
      })
      .optional()
      .nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.unique_price == true) {
      if (!val.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập giá sản phẩm',
          path: ['price'],
        })
      }
    } else {
      if (!val.variant) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập biến thể giá',
          path: ['variant'],
        })
      } else {
        if (!val.variant.attributes || val.variant.attributes.length == 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Vui lòng chọn thuộc tính của biến thể giá',
            path: ['attributes'],
          })
        }

        if (!val.variant.price) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Vui lòng nhập giá sản phẩm',
            path: ['price'],
          })
        }
      }
    }

    return z.NEVER
  })

export const updatePriceDto = z
  .object({
    unique_price: z.boolean().default(true),
    price: z.number({ required_error: 'Vui lòng nhập giá sản phẩm' }),
    variant_id: z.string().optional().nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.unique_price == false) {
      if (!val.variant_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng nhập ID biến thể',
          path: ['variant_id'],
        })
      }
    }

    return z.NEVER
  })

export const attributeDto = z.object({
  variant_id: z.string({ required_error: 'Vui lòng nhập ID biến thể' }),
  product_id: z.string({ required_error: 'Vui lòng nhập ID sản phẩm' }),
  attribute: z.object(
    {
      type: z.string({ required_error: 'Vui lòng chọn loại thuộc tính' }),
      name: z.string({ required_error: 'Vui lòng nhập tên tiếng Việt thuộc tính' }),
      name_en: z.string({ required_error: 'Vui lòng nhập tên tiếng Anh thuộc tính' }),
      value: z.string({ required_error: 'Vui lòng nhập giá trị tiếng Việt thuộc tính' }),
      value_en: z.string({ required_error: 'Vui lòng nhập giá trị tiếng Anh thuộc tính' }),
    },
    { required_error: 'Vui lòng nhập thông tin thuộc tính' },
  ),
})

export const deleteAttributeDto = z.object({
  variant_id: z.string({ required_error: 'Vui lòng nhập ID biến thể' }),
  product_id: z.string({ required_error: 'Vui lòng nhập ID sản phẩm' }),
  attribute_id: z.string({ required_error: 'Vui lòng nhập ID thuộc tính' }),
})

export type ProductPriceDto = z.infer<typeof productPriceDto>
export type UpdatePriceDto = z.infer<typeof updatePriceDto>
export type AttributeDto = z.infer<typeof attributeDto>
export type DeleteAttributeDto = z.infer<typeof deleteAttributeDto>
