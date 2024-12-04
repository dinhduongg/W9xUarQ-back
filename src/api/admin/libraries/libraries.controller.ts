import { Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { GlobalQuery } from 'src/common/types/global.type'
import { LibrariesService } from './libraries.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('admin/libraries')
@UseGuards(AdminGuard)
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  @Get()
  async getLibraries(@Query() query: GlobalQuery & { size: string }) {
    return this.librariesService.getLibraries(query)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.librariesService.uploadImage(file)
  }

  @Put('update/:id') // id: library id
  @UseInterceptors(FileInterceptor('image'))
  async updateLibrary(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    return this.librariesService.updateLibrary(file, id)
  }

  @Delete('delete/:id') // id: library id
  async deleteLibrary(@Param('id') id: string) {
    return this.librariesService.deleteLibrary(id)
  }
}
