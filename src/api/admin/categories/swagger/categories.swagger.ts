import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CategoryQueryDtoSwagger {
  @ApiProperty({
    description: 'ID of the parent category',
    example: 'null | 12345',
  })
  parent_id: string
}

export class CategoriesDtoSwagger {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Category Name',
  })
  name: string

  @ApiProperty({
    description: 'Name of the category in English',
    example: 'Category Name in English',
  })
  name_en: string

  @ApiProperty({
    description: 'Level of the category',
    example: 1,
  })
  level: number

  @ApiPropertyOptional({
    description: 'URL of the category image',
    example: 'https://example.com/image.png',
  })
  image_url?: string | null

  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'A detailed description of the category.',
  })
  description?: string | null

  @ApiPropertyOptional({
    description: 'Description of the category in English',
    example: 'A detailed description in English.',
  })
  description_en?: string | null

  @ApiPropertyOptional({
    description: 'Parent category ID',
    example: '12345',
  })
  parent?: string | null

  @ApiPropertyOptional({
    description: 'Sorting value for the category',
    example: 10,
  })
  sorted?: number | null
}
