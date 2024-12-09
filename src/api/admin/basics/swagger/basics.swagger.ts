import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class BasicQuery {
  @ApiProperty({ example: true, default: -1, description: '-1: lấy tất cả' })
  group_number: boolean
}

export class GroupBasicDtoSwagger {
  @ApiPropertyOptional({
    description: 'The ID of the group basic',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  _id?: string

  @ApiPropertyOptional({
    description: 'The number associated with the group basic',
    example: 123,
    required: false,
  })
  number?: number

  @ApiPropertyOptional({
    description: 'The name of the group basic',
    example: 'Group A',
    required: false,
  })
  name?: string
}

export class BasicDtoSwagger {
  @ApiProperty({
    description: 'Shell value, cannot be empty',
    example: 'shell_value',
  })
  shell: string

  @ApiProperty({
    description: 'Name value, cannot be empty',
    example: 'Name Value',
  })
  name: string

  @ApiPropertyOptional({
    description: 'Name in English, can be null or optional',
    example: 'Name in English',
    required: false,
  })
  name_en?: string | null

  @ApiPropertyOptional({
    description: 'Indicates if the item is enabled',
    example: true,
    required: false,
  })
  enabled?: boolean | null

  @ApiPropertyOptional({
    description: 'Indicates if plant text is enabled',
    example: true,
    required: false,
  })
  plant_text?: boolean | null

  @ApiPropertyOptional({
    description: 'A description, can be null or optional',
    example: 'A brief description',
    required: false,
  })
  description?: string | null

  @ApiProperty({
    description: 'Group Basic Information',
    required: true,
  })
  group_basic: GroupBasicDtoSwagger
}
