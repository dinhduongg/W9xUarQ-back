import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'product_histories',
})
export class ProductHistory extends IdSchema {
  /**
   * 1: Thêm sản phẩm
   * 2: Sửa sản phẩm
   * 3: Sửa giá sản phẩm (thêm/sửa giá)
   */
  @Prop({ type: Number })
  type_history: number

  @Prop({ type: String })
  admin_name: string

  @Prop({ type: String })
  product_id: string

  @Prop({ type: String })
  content: string | null
}

export type ProductHistoryDocument = HydratedDocument<ProductHistory>
export const ProductHistorySchema = SchemaFactory.createForClass(ProductHistory)
