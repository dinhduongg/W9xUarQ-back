import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'
import { GroupBasic } from './group-basic.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'basics',
  autoIndex: false,
})
export class Basic extends IdSchema {
  @Prop({ type: String })
  shell: string

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  name_en: string

  @Prop({ type: Boolean, default: true })
  enabled: boolean

  @Prop({ type: Boolean, default: false })
  plant_text: boolean

  @Prop({ type: String, default: null })
  description: string

  @Prop({ type: GroupBasic })
  group_basic: GroupBasic
}

export type BasicDocument = HydratedDocument<Basic>
export const BasicSchema = SchemaFactory.createForClass(Basic)
