import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IdSchema } from './base.schema'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'libraries',
  autoIndex: false,
})
export class Library extends IdSchema {
  @Prop({ type: String })
  public_id: string // dùng để xóa ảnh

  @Prop({ type: String })
  format: string

  @Prop({ type: Number })
  bytes: number

  @Prop({ type: String })
  file_name: string

  @Prop({ type: String })
  url: string

  @Prop({ type: String })
  secure_url: string
}

export type LibraryDocument = HydratedDocument<Library>
export const LibrarySchema = SchemaFactory.createForClass(Library)
