import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { PageDto, pageDto } from './dto/pages.dto'
import { PagesService } from './pages.service'
import { GlobalQuery } from 'src/common/types/global.type'

@Controller('admin/pages')
@UseGuards(AdminGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async getAll(@Query() query: GlobalQuery) {
    return this.pagesService.getAll(query)
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.pagesService.getDetail(id)
  }

  @Post()
  @UseZodValidation(pageDto)
  async create(@Body() body: PageDto) {
    return this.pagesService.create(body)
  }

  @Put(':id')
  @UseZodValidation(pageDto)
  async update(@Param('id') id: string, @Body() body: PageDto) {
    return this.pagesService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.pagesService.delete(id)
  }
}
