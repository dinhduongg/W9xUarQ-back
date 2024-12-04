import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class AdminRoleDtoBodySwagger {
  @ApiProperty({ example: 'admin123', description: 'The ID of the admin' })
  admin_id: string

  @ApiProperty({ example: 'role456', description: 'The ID of the role' })
  role_id: string
}

export class AdminRoleDtoSwagger {
  @ApiProperty({ example: 'admin123', description: 'The ID of the admin' })
  admin_id: string

  @ApiProperty({ example: false, description: 'Read permission flag' })
  is_read: boolean

  @ApiProperty({ example: false, description: 'Add permission flag' })
  is_add: boolean

  @ApiProperty({ example: false, description: 'Edit permission flag' })
  is_edit: boolean

  @ApiProperty({ example: false, description: 'Delete permission flag' })
  is_delete: boolean

  @ApiProperty({ type: String, description: 'Role ID reference' })
  role: Types.ObjectId
}

export class PermisionDtoSwagger {
  @ApiProperty({ example: true, description: 'Read permission flag' })
  is_read: boolean

  @ApiProperty({ example: true, description: 'Add permission flag' })
  is_add: boolean

  @ApiProperty({ example: true, description: 'Edit permission flag' })
  is_edit: boolean

  @ApiProperty({ example: true, description: 'Delete permission flag' })
  is_delete: boolean
}
