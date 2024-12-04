import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body('folder') folder: string) {
    return this.cloudinaryService.uploadImage(file, folder)
  }

  @Delete('delete/:id') // id: public_id of cloudinary image
  async deleteImage(@Param('id') id: string) {
    return this.cloudinaryService.deleteImage(id)
  }

  @Get('medium/:id') // id: public_id of cloudinary image
  async getMediumImage(@Param('id') id: string) {
    return this.cloudinaryService.getMediumImage(id)
  }
}
