import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Model } from 'mongoose'
import { IdSchema } from './base.schema'
import { Role } from './role.schema'
import { Sequence, SequenceDocument } from './sequence.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'dashboards',
  autoIndex: false,
})
export class Dashboard extends IdSchema {
  @Prop({ type: Number, unique: true })
  id: Sequence

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  icon: string

  @Prop({ type: Number, default: null })
  parent_id: number | null

  @Prop({ type: String, default: null })
  url: string | null

  @Prop({ type: String, default: null })
  notification: string | null

  @Prop({ type: Boolean, default: false })
  check_role: boolean

  @Prop({ type: Boolean, default: true })
  enabled: boolean

  @Prop({ type: Number, default: null })
  sorted: number | null

  @Prop({ type: Role, default: null })
  role: Role | null
}

export type DashboardDocument = HydratedDocument<Dashboard>
export const DashboardSchema = SchemaFactory.createForClass(Dashboard)

DashboardSchema.pre<DashboardDocument>('save', async function (next) {
  if (this.isNew) {
    const sequenceModel = this.model('Sequence') as Model<SequenceDocument>
    const sequence = await sequenceModel.findOneAndUpdate({ name: 'dashboard' }, { $inc: { value: 1 } }, { new: true, upsert: true })
    this.id = sequence.value
  }

  next()
})
