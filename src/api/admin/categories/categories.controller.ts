import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { CategoriesService } from './categories.service'
import { CategoriesDto, categoriesDto } from './dto/categories.dto'
import { CategoryQuery } from './sub-files/categories.query'

@Controller('admin/categories')
@UseGuards(AdminGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() query: CategoryQuery) {
    return this.categoriesService.getCategories(query)
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id)
  }

  @Post()
  @UseZodValidation(categoriesDto)
  async createCategory(@Body() body: CategoriesDto) {
    return this.categoriesService.createCategory(body)
  }

  @Put(':id')
  @UseZodValidation(categoriesDto)
  async updateCategory(@Param('id') id: string, @Body() body: CategoriesDto) {
    return this.categoriesService.updateCategory(id, body)
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id)
  }
}
