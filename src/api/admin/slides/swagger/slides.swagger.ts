import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { GlobalQuerySwagger } from 'src/common/swagger/global-dto'

export class SliderQuerySwagger extends GlobalQuerySwagger {
  @ApiProperty({ description: '0: mobile, 1: website' })
  platform: number
}

export class SliderBodySwagger {
  @ApiPropertyOptional({
    type: 'FormData',
    format: 'binary',
    description: 'The image file to upload',
  })
  image: any

  @ApiProperty({ description: 'Name of the slide', example: 'Welcome Slide' })
  name: string

  @ApiPropertyOptional({ description: 'URL of the slide', example: 'https://example.com' })
  url?: string | null

  @ApiProperty({ description: 'Image URL of the slide', example: 'https://example.com/image.png' })
  image_url: string

  @ApiProperty({ description: 'Enable status of the slide', example: true })
  enable: boolean

  @ApiProperty({ description: 'Platform ID', example: 1 })
  platform: number

  @ApiPropertyOptional({ description: 'Sorting order of the slide', example: 10 })
  sorted?: number | null
}
