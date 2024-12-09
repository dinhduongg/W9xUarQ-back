import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class PageDtoSwagger {
  @ApiProperty({
    description: 'Name of the page',
    example: 'About Us',
  })
  name: string

  @ApiProperty({
    description: 'Content of the page',
    example: '<p>Welcome to our website</p>',
  })
  content: string

  @ApiProperty({
    description: 'Related information',
    example: 'General information',
  })
  information: string

  @ApiPropertyOptional({
    description: 'Name of the page in English',
    example: 'About Us',
  })
  name_en?: string | null

  @ApiPropertyOptional({
    description: 'Content of the page in English',
    example: '<p>Welcome to our website</p>',
  })
  content_en?: string | null

  @ApiPropertyOptional({
    description: 'Meta description of the page',
    example: 'This is the about us page meta description.',
  })
  meta_description?: string | null

  @ApiPropertyOptional({
    description: 'Meta description of the page in English',
    example: 'This is the about us page meta description (English).',
  })
  meta_description_en?: string | null

  @ApiPropertyOptional({
    description: 'URL of the page image',
    example: 'https://example.com/images/page.jpg',
  })
  image_url?: string | null

  @ApiPropertyOptional({
    description: 'Sorting order of the page',
    example: 1,
  })
  sorted?: number | null
}
