import { ApiProperty } from '@nestjs/swagger'

export class GlobalQuerySwagger {
  @ApiProperty({ example: 1, description: 'Page number' })
  page: number

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number

  @ApiProperty({ example: 'search term', description: 'Search query' })
  q: string
}

export class JwtPayloadSwagger {
  @ApiProperty({ example: 'user123', description: 'User ID' })
  id: string

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string
}

export class PayloadAdminSwagger {
  @ApiProperty({ example: 'admin123', description: 'Admin ID' })
  id: string

  @ApiProperty({ example: 'John Doe', description: 'Admin name' })
  name: string

  @ApiProperty({ example: 'admin@example.com', description: 'Admin email' })
  email: string

  @ApiProperty({ example: 'some_jwt_token', description: 'JWT token' })
  token: string

  @ApiProperty({ example: ['role1', 'role2'], description: 'Admin roles' })
  roles: string[]
}
