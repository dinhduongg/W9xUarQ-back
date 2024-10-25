import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'categories',
  autoIndex: false,
})
export class Category extends IdSchema {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  name_en: string

  @Prop({ type: String, default: null })
  description: string | null

  @Prop({ type: String, default: null })
  description_en: string | null

  @Prop({ type: Number, default: null })
  sorted: number | null

  @Prop({ type: String, default: null })
  image_url: string | null

  @Prop({ type: String, default: null })
  slug: string | null

  @Prop({ type: Number, default: 1 })
  level: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name, default: null })
  parent: Category | null
}

export type CategoryDocument = HydratedDocument<Category>
export const CategorySchema = SchemaFactory.createForClass(Category)
