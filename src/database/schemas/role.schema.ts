import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type RoleDocument = HydratedDocument<Role>

@Schema({ versionKey: false, timestamps: false, collection: 'roles' })
export class Role {
  @Prop({ default: uuidv4 })
  _id: string

  @Prop({ required: true, unique: true })
  code: string

  @Prop({ type: String, default: null })
  description: string | null
}

export const RoleSchema = SchemaFactory.createForClass(Role)
