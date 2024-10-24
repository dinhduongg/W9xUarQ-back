import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { BaseSchema } from './base.schema'

export type AdminDocument = HydratedDocument<Admin>

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'admins',
})
export class Admin extends BaseSchema {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  email: string

  @Prop({ type: String })
  password: string

  @Prop({ type: String, default: null })
  avatar: string | null

  @Prop({ type: Boolean, default: true })
  is_enable: boolean

  @Prop({ type: Boolean, default: false })
  is_login: boolean

  @Prop({ type: Date, default: null })
  locked_at: Date | null

  @Prop({ type: String, default: null })
  refresh_token: string | null
}

export const AdminSchema = SchemaFactory.createForClass(Admin)

// Add pre-save hook to hash password
AdminSchema.pre<AdminDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }

  // if (this.isNew) {
  //   const modelName = this.collection.name
  //   const sequenceModel = this.model('Sequence') as Model<SequenceDocument>
  //   const sequence = await sequenceModel.findOneAndUpdate({ name: modelName }, { $inc: { value: 1 } }, { new: true, upsert: true })
  //   this.id = sequence.value
  // }

  next()
})
