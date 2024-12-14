import { Controller, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { ProductHistoriesService } from './product-histories.service'

@ApiTags('Product histories')
@ApiBearerAuth()
@Controller('admin/product-histories')
@UseGuards(AdminGuard)
export class ProductHistoriesController {
  constructor(private readonly productHistoriesService: ProductHistoriesService) {}
}
