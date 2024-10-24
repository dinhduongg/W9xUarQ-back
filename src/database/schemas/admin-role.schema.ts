import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose'
import { IdSchema } from './base.schema'
import { Role } from './role.schema'

export type AdminRoleDocument = HydratedDocument<AdminRole>

@Schema({ versionKey: false, timestamps: false, collection: 'admin_roles' })
export class AdminRole extends IdSchema {
  @Prop({ type: String, required: true })
  admin_id: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name })
  role: Role

  @Prop({ type: Boolean, default: false })
  is_read: boolean

  @Prop({ type: Boolean, default: false })
  is_add: boolean

  @Prop({ type: Boolean, default: false })
  is_edit: boolean

  @Prop({ type: Boolean, default: false })
  is_delete: boolean
}

export const AdminRoleSchema = SchemaFactory.createForClass(AdminRole)
