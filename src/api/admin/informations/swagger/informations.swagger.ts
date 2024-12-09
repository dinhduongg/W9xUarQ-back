import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class InformationDtoSwagger {
  @ApiProperty({
    description: 'Tên thông tin (bắt buộc)',
    example: 'Thông tin sản phẩm',
  })
  name: string

  @ApiProperty({
    description: 'Tên thông tin bằng tiếng Anh (bắt buộc)',
    example: 'Product Information',
  })
  name_en: string

  @ApiPropertyOptional({
    description: 'Mô tả thông tin',
    example: 'Mô tả chi tiết sản phẩm',
  })
  description?: string | null

  @ApiPropertyOptional({
    description: 'Mô tả thông tin bằng tiếng Anh',
    example: 'Detailed product description',
  })
  description_en?: string | null

  @ApiPropertyOptional({
    description: 'Mô tả meta',
    example: 'Meta description for SEO',
  })
  meta_description?: string | null

  @ApiPropertyOptional({
    description: 'Mô tả meta bằng tiếng Anh',
    example: 'Meta description for SEO in English',
  })
  meta_description_en?: string | null
}
