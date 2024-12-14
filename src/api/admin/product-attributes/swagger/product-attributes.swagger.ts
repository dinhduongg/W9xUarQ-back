import { ApiProperty } from '@nestjs/swagger'

export class ProductAttributeDtoSwagger {
  @ApiProperty({
    description: 'The type of the product attribute.',
    example: 'color',
    required: true,
  })
  type: string

  @ApiProperty({
    description: 'The name of the product attribute in Vietnamese.',
    example: 'Màu sắc',
    required: true,
  })
  name: string

  @ApiProperty({
    description: 'The name of the product attribute in English.',
    example: 'Color',
    required: true,
  })
  name_en: string
}
