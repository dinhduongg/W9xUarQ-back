import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { GlobalQueryDto } from 'src/common/dto/global.dto'

export class CreateProductDtoSwagger {
  @ApiProperty({
    description: 'Product name',
    example: 'Sample Product',
    required: true,
  })
  name: string

  @ApiProperty({
    description: 'Product name in English',
    example: 'Sample Product EN',
    required: true,
  })
  name_en: string

  @ApiProperty({
    description: 'Category ID for the product',
    example: '123',
    required: true,
  })
  category_id: string

  @ApiPropertyOptional({
    description: 'Image URL for the product',
    example: 'https://example.com/product-image.jpg',
    nullable: true,
  })
  image_url?: string | null

  @ApiProperty({
    description: 'Indicates whether a custom slug is used',
    example: false,
    required: false,
    default: false,
  })
  custom_slug: boolean

  @ApiPropertyOptional({
    description: 'Custom slug for the product',
    example: 'sample-product',
    nullable: true,
  })
  slug?: string | null
}

export class UpdateProductDtoSwagger {
  // Group: Name
  @ApiProperty({
    description: 'Indicates if the name is being updated',
    example: false,
    required: false,
    default: false,
  })
  is_update_name: boolean = false

  @ApiProperty({
    description: 'Indicates if the slug is custom created by the user',
    example: false,
    required: false,
    default: false,
  })
  custom_slug: boolean = false

  @ApiPropertyOptional({
    description: 'Product name in Vietnamese',
    example: 'Sample Product',
    nullable: true,
  })
  name?: string | null

  @ApiPropertyOptional({
    description: 'Product name in English',
    example: 'Sample Product EN',
    nullable: true,
  })
  name_en?: string | null

  @ApiPropertyOptional({
    description: 'Custom slug for the product',
    example: 'sample-product',
    nullable: true,
  })
  slug?: string | null

  @ApiPropertyOptional({
    description: 'Image URL for the product',
    example: 'https://example.com/product-image.jpg',
    nullable: true,
  })
  image_url?: string | null

  // Group: Description
  @ApiPropertyOptional({
    description: 'Product description in Vietnamese',
    example: 'Sản phẩm tuyệt vời.',
    nullable: true,
  })
  description?: string | null

  @ApiPropertyOptional({
    description: 'Product description in English',
    example: 'An amazing product.',
    nullable: true,
  })
  description_en?: string | null

  @ApiPropertyOptional({
    description: 'Additional description in Vietnamese',
    example: 'Thêm thông tin chi tiết.',
    nullable: true,
  })
  additional_description?: string | null

  @ApiPropertyOptional({
    description: 'Additional description in English',
    example: 'Extra detailed information.',
    nullable: true,
  })
  additional_description_en?: string | null

  // Group: SEO Title
  @ApiPropertyOptional({
    description: 'SEO title for the product',
    example: 'Best Product Ever',
    nullable: true,
  })
  meta_title?: string | null

  @ApiPropertyOptional({
    description: 'SEO title en for the product',
    example: 'Best Product Ever',
    nullable: true,
  })
  meta_title_en?: string | null

  @ApiPropertyOptional({
    description: 'SEO meta description for the product',
    example: 'This product is the best choice for you.',
    nullable: true,
  })
  meta_description?: string | null

  @ApiPropertyOptional({
    description: 'SEO meta description en for the product',
    example: 'This product is the best choice for you.',
    nullable: true,
  })
  meta_description_en?: string | null

  // Group: Other
  @ApiPropertyOptional({
    description: 'Indicates if the product is hot',
    example: true,
    nullable: true,
  })
  hot?: boolean | null
}

export class ProductQueryDto extends GlobalQueryDto {
  @ApiProperty({
    description: 'The ID of the category',
    type: String,
    example: '12345',
  })
  category_id: string

  @ApiProperty({
    description: 'The ID of the product',
    type: String,
    example: '67890',
  })
  product_id: string
}
