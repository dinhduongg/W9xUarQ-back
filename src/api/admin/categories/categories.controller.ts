import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { CategoriesService } from './categories.service'
import { CategoriesDto, categoriesDto } from './dto/categories.dto'
import { CategoryQuery } from './sub-files/categories.query'
import { CategoriesDtoSwagger, CategoryQueryDtoSwagger } from './swagger/categories.swagger'

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(AdminGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách danh mục' })
  @ApiQuery({ type: CategoryQueryDtoSwagger })
  async getCategories(@Query() query: CategoryQuery) {
    return this.categoriesService.getCategories(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết danh mục' })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  async getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới danh mục' })
  @ApiBody({ type: CategoriesDtoSwagger })
  @UseZodValidation(categoriesDto)
  async createCategory(@Body() body: CategoriesDto) {
    return this.categoriesService.createCategory(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiBody({ type: CategoriesDtoSwagger })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  @UseZodValidation(categoriesDto)
  async updateCategory(@Param('id') id: string, @Body() body: CategoriesDto) {
    return this.categoriesService.updateCategory(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id)
  }
}
