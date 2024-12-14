import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { ProductAttributeDto, productAttributeDto } from './dto/product-attributes.dto'
import { ProductAttributesService } from './product-attributes.service'
import { ProductAttributeDtoSwagger } from './swagger/product-attributes.swagger'

@ApiTags('Product Attributes')
@ApiBearerAuth()
@Controller('admin/product-attributes')
@UseGuards(AdminGuard)
export class ProductAttributesController {
  constructor(private readonly productAttributesService: ProductAttributesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách' })
  async getAll() {
    return this.productAttributesService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async getDetail(@Param('id') id: string) {
    return this.productAttributesService.getDetail(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới' })
  @ApiBody({ type: ProductAttributeDtoSwagger })
  @UseZodValidation(productAttributeDto)
  async create(@Body() body: ProductAttributeDto) {
    return this.productAttributesService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  @ApiBody({ type: ProductAttributeDtoSwagger })
  @UseZodValidation(productAttributeDto)
  async update(@Param('id') id: string, @Body() body: ProductAttributeDto) {
    return this.productAttributesService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async delete(@Param('id') id: string) {
    return this.productAttributesService.delete(id)
  }
}
