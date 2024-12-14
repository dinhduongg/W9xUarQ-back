import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: false,
  collection: 'product_attributes',
})
export class ProductAttribute extends IdSchema {
  @Prop({ type: String, required: true })
  type: string

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  name_en: string
}

export type ProductAttributeDocument = HydratedDocument<ProductAttribute>
export const ProductAttributeSchema = SchemaFactory.createForClass(ProductAttribute)
