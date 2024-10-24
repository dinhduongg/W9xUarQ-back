import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

export type RoleDocument = HydratedDocument<Role>

@Schema({ versionKey: false, timestamps: false, collection: 'roles' })
export class Role extends IdSchema {
  @Prop({ required: true, unique: true })
  code: string

  @Prop({ type: String, default: null })
  description: string | null
}

export const RoleSchema = SchemaFactory.createForClass(Role)
