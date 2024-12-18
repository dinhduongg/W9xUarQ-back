import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({ versionKey: false, timestamps: false, collection: 'slides' })
export class Slide extends IdSchema {
  @Prop({ type: String })
  name: string

  @Prop({ type: String, default: null })
  url: string | null

  @Prop({ type: String, required: true })
  image_url: string

  @Prop({ type: Boolean, default: true })
  enable: boolean

  @Prop({ type: Number, default: 0 })
  platform: number // 0: mobile, 1: website

  @Prop({ type: Number, default: null })
  sorted: number | null
}

export type SlideDocument = HydratedDocument<Slide>
export const SlideSchema = SchemaFactory.createForClass(Slide)
