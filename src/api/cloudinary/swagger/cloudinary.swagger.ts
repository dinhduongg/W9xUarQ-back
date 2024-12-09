import { ApiProperty } from '@nestjs/swagger'

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file to upload',
  })
  image: any
}
