import { ApiProperty } from '@nestjs/swagger'

export class GroupBasicSwagger {
  @ApiProperty({
    description: 'The number associated with the group',
    example: 123,
  })
  number: number

  @ApiProperty({
    description: 'The name of the group',
    example: 'Admin Group',
  })
  name: string
}
