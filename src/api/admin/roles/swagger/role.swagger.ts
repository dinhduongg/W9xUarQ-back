import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RoleDtoSwagger {
  @ApiProperty({
    description: 'Role code (unique identifier for the role)',
    example: 'ADMIN',
  })
  code: string

  @ApiPropertyOptional({
    description: 'Description of the role',
    example: 'Administrator with full access rights',
  })
  description?: string | null
}
