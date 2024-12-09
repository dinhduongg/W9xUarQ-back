import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class GlobalQueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  page: number

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number

  @ApiPropertyOptional({
    description: 'Search query string',
    example: 'keyword',
  })
  q?: string
}
