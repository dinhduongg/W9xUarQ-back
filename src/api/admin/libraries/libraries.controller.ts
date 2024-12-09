import { Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { GlobalQuery } from 'src/common/types/global.type'
import { LibrariesService } from './libraries.service'
import { LibrariesQueryDto, UploadFileDto } from './swagger/libraries.swagger'

@ApiTags('Libraries')
@ApiBearerAuth()
@Controller('admin/libraries')
@UseGuards(AdminGuard)
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách' })
  @ApiQuery({ type: LibrariesQueryDto })
  async getLibraries(@Query() query: GlobalQuery & { size: string }) {
    return this.librariesService.getLibraries(query)
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload hình' })
  @ApiQuery({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.librariesService.uploadImage(file)
  }

  @Put('update/:id') // id: library id
  @ApiOperation({ summary: 'Cập nhật hình' })
  @ApiParam({ name: 'id', example: 'libraryID', description: 'ID' })
  @ApiQuery({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('image'))
  async updateLibrary(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    return this.librariesService.updateLibrary(file, id)
  }

  @Delete('delete/:id') // id: library id
  @ApiOperation({ summary: 'Xóa hình' })
  @ApiParam({ name: 'id', example: 'libraryID', description: 'ID' })
  async deleteLibrary(@Param('id') id: string) {
    return this.librariesService.deleteLibrary(id)
  }
}
