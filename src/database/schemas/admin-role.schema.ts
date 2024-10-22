import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { Admin } from './admin.schema'
import { Role } from './role.schema'

export type AdminRoleDocument = HydratedDocument<AdminRole>

@Schema({ versionKey: false, timestamps: false, collection: 'admin_roles' })
export class AdminRole {
  @Prop({ default: uuidv4 })
  _id: string

  @Prop({ type: String, required: true })
  admin_id: string

  @Prop({ type: String, required: true })
  role_id: string

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

// virtual field for references
AdminRoleSchema.virtual('admin', {
  ref: Admin.name,
  localField: 'admin_id',
  foreignField: '_id',
  justOne: true,
})

AdminRoleSchema.virtual('role', {
  ref: Role.name,
  localField: 'role_id',
  foreignField: '_id',
  justOne: true,
})
