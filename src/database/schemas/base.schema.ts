import { Prop } from '@nestjs/mongoose'

export class BaseSchema {
  _id?: string // Sau này sẽ dùng với class-transformer để serialize dữ liệu response

  @Prop({ default: null })
  deleted_at: Date // Dùng cho soft delete
}

export class IdSchema {
  _id: string
}
