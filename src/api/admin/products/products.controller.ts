import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AdminPayload } from 'src/common/decorators/admin-payload.decorator'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { GlobalQuery, PayloadAdmin } from 'src/common/types/global.type'
import { createProductDto, CreateProductDto, ProductQuery, UpdateProductDto, updateProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'
import { CreateProductDtoSwagger, ProductQueryDto, UpdateProductDtoSwagger } from './swagger/products.swagger'
import { GlobalQuerySwagger } from 'src/common/swagger/global-dto'

@ApiTags('Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(AdminGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  @ApiQuery({ type: ProductQueryDto })
  async findAll(@Query() query: ProductQuery) {
    return this.productsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Get('quick/search')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm cho thanh tìm kiếm' })
  @ApiQuery({ type: GlobalQuerySwagger })
  async quickSearch(@Query() query: GlobalQuery) {
    return this.productsService.quickSearch(query)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiBody({ type: CreateProductDtoSwagger })
  @UseZodValidation(createProductDto)
  async create(@Body() body: CreateProductDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productsService.create(body, admin)
  }

  @Put('restore/:id')
  @ApiOperation({ summary: 'Khôi phục sản phẩm đã ẩn' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async restore(@Param('id') id: string) {
    return this.productsService.restore(id)
  }

  @Delete('soft-delete/:id')
  @ApiOperation({ summary: 'Ẩn sản phẩm (soft delete)' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async softDelete(@Param('id') id: string, @AdminPayload() admin: PayloadAdmin) {
    return this.productsService.softDelete(id, admin)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  @ApiQuery({ type: UpdateProductDtoSwagger })
  @UseZodValidation(updateProductDto)
  async update(@Param('id') id: string, @Body() body: UpdateProductDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productsService.update(id, body, admin)
  }
}
