import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { UploadFileDto } from './swagger/cloudinary.swagger'

@ApiTags('Cloudinary')
@ApiBearerAuth()
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload hình' })
  @ApiQuery({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body('folder') folder: string) {
    return this.cloudinaryService.uploadImage(file, folder)
  }

  @Delete('delete/:id') // id: public_id of cloudinary image
  @ApiOperation({ summary: 'Xóa hình' })
  @ApiParam({ name: 'public_id', example: 'configId', description: 'public_id of cloudinary' })
  async deleteImage(@Param('id') id: string) {
    return this.cloudinaryService.deleteImage(id)
  }

  @Get('medium/:id') // id: public_id of cloudinary image
  @ApiOperation({ summary: 'Lấy hình theo định dạng medium 400x400' })
  @ApiParam({ name: 'id', example: 'public_id', description: 'public_id of cloudinary' })
  async getMediumImage(@Param('id') id: string) {
    return this.cloudinaryService.getMediumImage(id)
  }
}
