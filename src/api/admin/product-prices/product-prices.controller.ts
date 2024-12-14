import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { AdminPayload } from 'src/common/decorators/admin-payload.decorator'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { PayloadAdmin } from 'src/common/types/global.type'
import { AttributeDto, attributeDto, DeleteAttributeDto, deleteAttributeDto, ProductPriceDto, productPriceDto, UpdatePriceDto, updatePriceDto } from './dto/product-prices.dto'
import { ProductPricesService } from './product-prices.service'
import { AttributeDtoSwagger, DeleteAttributeDtoSwagger, ProductPriceDtoSwagger, UpdatePriceDtoSwagger } from './swagger/product-prices.swagger'

@ApiTags('Product prices')
@ApiBearerAuth()
@Controller('admin/product-prices')
@UseGuards(AdminGuard)
export class ProductPricesController {
  constructor(private readonly productPricesService: ProductPricesService) {}

  /**
   * BEGIN giá duy nhất hoặc giá biến thể
   */

  @Post(':id')
  @ApiOperation({ summary: 'Thêm giá cho sản phẩm' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID của sản phẩm cần thêm giá' })
  @ApiBody({ type: ProductPriceDtoSwagger })
  @UseZodValidation(productPriceDto)
  async addPrice(@Param('id') id: string, @Body() body: ProductPriceDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productPricesService.addPrice(id, body, admin)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật giá cho sản phẩm' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID của sản phẩm cần cập nhật giá' })
  @ApiBody({ type: UpdatePriceDtoSwagger })
  @UseZodValidation(updatePriceDto)
  async updatePrice(@Param('id') id: string, @Body() body: UpdatePriceDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productPricesService.updatePrice(id, body, admin)
  }

  /**
   * BEGIN thuộc tính của biến thể giá
   */

  @Post('add/attribute')
  @ApiOperation({ summary: 'Thêm thuộc tính cho biến thể giá' })
  @ApiBody({ type: AttributeDtoSwagger })
  @UseZodValidation(attributeDto)
  async addAttribute(@Body() body: AttributeDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productPricesService.addAttribute(body, admin)
  }

  @Delete('delete/attribute')
  @ApiOperation({ summary: 'Xóa thuộc tính của biến thể giá' })
  @ApiBody({ type: DeleteAttributeDtoSwagger })
  @UseZodValidation(deleteAttributeDto)
  async deleteAttribute(@Body() body: DeleteAttributeDto, @AdminPayload() admin: PayloadAdmin) {
    return this.productPricesService.deleteAttribute(body, admin)
  }
}
