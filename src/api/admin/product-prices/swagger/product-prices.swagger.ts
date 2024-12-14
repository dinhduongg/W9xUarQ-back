import { ApiProperty } from '@nestjs/swagger'

class Attribute {
  @ApiProperty({ type: String, required: false, nullable: true })
  type?: string

  @ApiProperty({ type: String, required: false, nullable: true })
  name?: string

  @ApiProperty({ type: String, required: false, nullable: true })
  name_en?: string

  @ApiProperty({ type: String, required: false, nullable: true })
  value?: string

  @ApiProperty({ type: String, required: false, nullable: true })
  value_en?: string
}

export class Variant {
  id?: string

  @ApiProperty({ type: [Attribute], required: false, nullable: true })
  attributes?: Attribute[]

  @ApiProperty({ type: Number, required: false, nullable: true })
  price?: number
}

export class ProductPriceDtoSwagger {
  @ApiProperty({ type: Boolean, default: true })
  unique_price: boolean

  @ApiProperty({ type: Number, required: false, nullable: true })
  price?: number

  @ApiProperty({ type: Variant, required: false, nullable: true })
  variant?: Variant
}

export class UpdatePriceDtoSwagger {
  @ApiProperty({ type: Boolean, default: true })
  unique_price: boolean

  @ApiProperty({ type: Number, required: true })
  price: number

  @ApiProperty({ type: String, required: false, nullable: true })
  variant_id?: string
}

export class AttributeDtoSwagger {
  @ApiProperty({ type: String })
  variant_id: string

  @ApiProperty({ type: String })
  product_id: string

  @ApiProperty({ type: Attribute })
  attribute: Attribute
}

export class DeleteAttributeDtoSwagger {
  @ApiProperty({ type: String })
  variant_id: string

  @ApiProperty({ type: String })
  product_id: string

  @ApiProperty({ type: String })
  attribute_id: string
}
