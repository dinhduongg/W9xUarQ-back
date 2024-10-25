import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'informations',
  autoIndex: false,
})
export class Information extends IdSchema {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  name_en: string

  @Prop({ type: String, default: null })
  description: string | null

  @Prop({ type: String, default: null })
  description_en: string | null

  @Prop({ type: String })
  slug: string

  @Prop({ type: String, default: null })
  meta_description: string | null

  @Prop({ type: String, default: null })
  meta_description_en: string | null
}

export type InformationDocument = HydratedDocument<Information>
export const InformationSchema = SchemaFactory.createForClass(Information)
