import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { HydratedDocument } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type AdminDocument = HydratedDocument<Admin>

@Schema({ versionKey: false, timestamps: true, collection: 'admins' })
export class Admin {
  @Prop({ default: uuidv4 })
  _id: string

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
