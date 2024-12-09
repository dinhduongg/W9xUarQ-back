import { ApiProperty } from '@nestjs/swagger'
import { GlobalQueryDto } from 'src/common/dto/global.dto'

export class LibrariesQueryDto extends GlobalQueryDto {
  @ApiProperty({
    description: 'Library size',
    example: 'image',
  })
  size: string
}

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file to upload',
  })
  image: any
}
