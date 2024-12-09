import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { PageDto, pageDto } from './dto/pages.dto'
import { PagesService } from './pages.service'
import { GlobalQuery } from 'src/common/types/global.type'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { GlobalQueryDto } from 'src/common/dto/global.dto'
import { PageDtoSwagger } from './swagger/pages.swagger'

@ApiTags('Pages')
@ApiBearerAuth()
@Controller('admin/pages')
@UseGuards(AdminGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách' })
  @ApiQuery({ type: GlobalQueryDto })
  async getAll(@Query() query: GlobalQuery) {
    return this.pagesService.getAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async getDetail(@Param('id') id: string) {
    return this.pagesService.getDetail(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới' })
  @ApiBody({ type: PageDtoSwagger })
  @UseZodValidation(pageDto)
  async create(@Body() body: PageDto) {
    return this.pagesService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  @ApiBody({ type: PageDtoSwagger })
  @UseZodValidation(pageDto)
  async update(@Param('id') id: string, @Body() body: PageDto) {
    return this.pagesService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async delete(@Param('id') id: string) {
    return this.pagesService.delete(id)
  }
}
