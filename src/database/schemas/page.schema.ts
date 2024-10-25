import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose'
import { IdSchema } from './base.schema'
import { Information } from './information.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'pages',
  autoIndex: false,
})
export class Page extends IdSchema {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  name_en: string

  @Prop({ type: String, default: null })
  content: string

  @Prop({ type: String, default: null })
  content_en: string

  @Prop({ type: String, default: null })
  meta_description: string | null

  @Prop({ type: String, default: null })
  meta_description_en: string | null

  @Prop({ type: String })
  slug: string

  @Prop({ type: String, default: null })
  image_url: string | null

  @Prop({ type: Number, default: null })
  sorted: number | null

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Information.name })
  information: Information
}

export type PageDocument = HydratedDocument<Page>
export const PageSchema = SchemaFactory.createForClass(Page)
