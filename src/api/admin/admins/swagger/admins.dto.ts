import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string

  @ApiProperty({ example: 'securepassword123', description: 'The password of the user' })
  password: string

  @ApiProperty({ example: null, description: 'URL of the user avatar', nullable: true })
  avatar: string | null

  @ApiProperty({ example: true, description: 'Indicates if the user is enabled' })
  is_enable: boolean

  @ApiProperty({ example: false, description: 'Indicates if the user is currently logged in' })
  is_login: boolean

  @ApiProperty({ example: null, description: 'Date when the account was locked', nullable: true })
  locked_at: Date | null

  @ApiProperty({ example: null, description: 'Refresh token for the user session', nullable: true })
  refresh_token: string | null
}

export class AdminDtoSwagger {
  @ApiProperty({ example: 'John Doe', description: 'The name of the admin' })
  name: string

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the admin' })
  email: string

  @ApiProperty({ example: 'securepassword123', description: 'The password of the admin' })
  password: string
}

export class UpdateDtoSwagger {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
  name?: string

  @ApiProperty({ example: 'http://example.com/avatar.jpg', description: 'URL of the user avatar', nullable: true, required: false })
  avatar?: string | null

  @ApiProperty({ example: true, description: 'Indicates if the user is enabled', required: false })
  is_enable?: boolean
}

export class ChangePasswordDtoSwagger {
  @ApiProperty({ example: 'newPassword123', description: 'The new password', required: true })
  password: string
}
