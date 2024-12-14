import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as uuid from 'uuid'
import { BaseSchema } from './base.schema'
import { ProductHistory } from './product-history.schema'

class Discount {
  @Prop({ type: Boolean, default: false })
  active: boolean

  @Prop({ enum: ['percentage', 'fixed'] })
  type: string

  @Prop({ type: Number })
  value: number
}

class Attribute {
  @Prop({ type: String, default: uuid.v4 })
  id: string

  @Prop({ type: String })
  type: string // e.g. size | color

  @Prop({ type: String })
  name: string // e.g. Kích thước | Màu sắc

  @Prop({ type: String })
  name_en: string // e.g. Size | Color

  @Prop({ type: String })
  value: string // e.g. S, M, L, XL | Đỏ, Xanh dương, Xanh lá

  @Prop({ type: String })
  value_en: string // e.g. S, M, L, XL | Red, Blue, Green
}

/**
 * Mỗi biến thể sẽ có 1 giá riêng
 * Mỗi biến thể có 1 hoặc nhiều attribute
 * Nếu biến thể có 2 attribute -> có thể có nhiều biến thể có cùng attribute ĐẦU TIÊN
 * VÍ DỤ: Áo có 2 attribute: size và color -> 1 size M có thể có nhiều color. attribure: {size: M, color: red, price: 1000}, {size: M, color: blue, price: 2000}
 * Nếu có nhiều attribute thì GIÁ sẽ XUẤT HIỆN khi người dùng chọn đến attribute cuối cùng
 */
class Variant {
  @Prop({ type: String, default: uuid.v4 })
  id: string

  @Prop({ type: [Attribute] })
  attributes: Attribute[]

  @Prop({ type: Number })
  price: number

  @Prop({ type: Number, default: 0 })
  stock: number
}

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'products',
})
export class Product extends BaseSchema {
  @Prop({ type: String, required: true, index: true })
  name: string

  @Prop({ type: String, required: true, index: true })
  name_en: string

  @Prop({ type: String })
  slug: string

  @Prop({ type: String })
  description: string

  @Prop({ type: String })
  description_en: string

  @Prop({ type: [String] })
  additional_description: string[]

  @Prop({ type: [String] })
  additional_description_en: string[]

  @Prop({ type: [Variant] })
  variants: Variant[] | null

  @Prop({ type: Number })
  price: number | null // default price nếu không có variant (biến thể)

  @Prop({ type: Number })
  stock: number | null // default stock nếu không có variant (biến thể)

  @Prop({ type: Discount })
  discount: Discount | null

  @Prop({ type: Boolean, default: false, index: true })
  hot: boolean // Hiển thị ở trang chủ

  @Prop({ type: Number, default: 0 })
  number_comment: number // số lượt bình luận

  @Prop({ type: String })
  image_url: string | null

  @Prop({ type: String })
  meta_title: string

  @Prop({ type: String })
  meta_title_en: string

  @Prop({ type: String })
  meta_description: string

  @Prop({ type: String })
  meta_description_en: string

  @Prop({ type: Number })
  total_stock: number // tổng số lượng hàng tồn kho

  @Prop({ type: String, required: true })
  category_id: string // danh mục sản phẩm

  @Prop({ type: String })
  admin_name: string | null // tên nhân viên ẩn sản phẩm

  @Prop({ type: ProductHistory })
  history_create: ProductHistory | null

  @Prop({ type: ProductHistory })
  history_update: ProductHistory | null

  @Prop({ type: Boolean, default: true })
  unique_price: boolean // giá độc lập hoặc giá theo biến thể
}

export type ProductDocument = HydratedDocument<Product>
export const ProductSchema = SchemaFactory.createForClass(Product)
