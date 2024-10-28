import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: false,
  collection: 'group_basics',
  autoIndex: false,
})
export class GroupBasic extends IdSchema {
  @Prop({ type: Number })
  number: number

  @Prop({ type: String })
  name: string
}

export type GroupBasicDocument = HydratedDocument<GroupBasic>
export const GroupBasicSchema = SchemaFactory.createForClass(GroupBasic)
