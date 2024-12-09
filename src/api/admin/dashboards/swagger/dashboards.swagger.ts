import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class DashBoardQuery {
  @ApiProperty({ example: 'parentID' })
  parent_id: number | null
}

class RoleDto {
  @ApiPropertyOptional({
    description: 'Role ID',
    example: 'role123',
  })
  _id?: string | null

  @ApiPropertyOptional({
    description: 'Role code',
    example: 'ADMIN',
  })
  code?: string | null

  @ApiPropertyOptional({
    description: 'Role description',
    example: 'Administrator role with full permissions',
  })
  description?: string | null
}

export class DashboardDtoSwagger {
  @ApiProperty({
    description: 'Name of the dashboard item',
    example: 'Dashboard Name',
  })
  name: string

  @ApiPropertyOptional({
    description: 'Parent ID of the dashboard item',
    example: 1,
  })
  parent_id?: number | null

  @ApiPropertyOptional({
    description: 'Role information associated with the dashboard item',
    type: RoleDto,
  })
  role?: RoleDto | null

  @ApiPropertyOptional({
    description: 'URL associated with the dashboard item',
    example: 'https://example.com/dashboard',
  })
  url?: string | null

  @ApiProperty({
    description: 'Icon for the dashboard item',
    example: 'icon-dashboard',
  })
  icon: string

  @ApiPropertyOptional({
    description: 'Sort order of the dashboard item',
    example: 1,
  })
  sorted?: number | null

  @ApiPropertyOptional({
    description: 'Notification associated with the dashboard item',
    example: 'You have new messages',
  })
  notification?: string | null

  @ApiPropertyOptional({
    description: 'Flag indicating whether the role is checked',
    example: true,
  })
  check_role?: boolean | null

  @ApiPropertyOptional({
    description: 'Flag indicating whether the dashboard item is enabled',
    example: true,
  })
  enabled?: boolean | null
}
