import { ApiProperty } from '@nestjs/swagger'

export class LoginDtoSwagger {
  @ApiProperty({
    description: 'The user email address',
    example: 'user@example.com',
    required: true,
  })
  email: string

  @ApiProperty({
    description: 'The user password',
    example: 'password123',
    required: true,
  })
  password: string
}

export class LogoutDtoSwagger {
  @ApiProperty({
    description: 'The user ID',
    example: 'user123',
    required: true,
  })
  id: string
}

export class RefreshTokenSwagger {
  @ApiProperty({
    description: 'The refresh token',
    example: 'refresh_token',
    required: true,
  })
  refresh_token: string
}
