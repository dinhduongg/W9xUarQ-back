import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductHistory, ProductHistorySchema } from 'src/database/schemas/product-history.schema'
import { Product, ProductSchema } from 'src/database/schemas/product.schema'
import { AdminsModule } from '../admins/admins.module'
import { ProductHistoriesController } from './product-histories.controller'
import { ProductHistoriesService } from './product-histories.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductHistory.name, schema: ProductHistorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    AdminsModule,
  ],
  controllers: [ProductHistoriesController],
  providers: [ProductHistoriesService],
  exports: [ProductHistoriesService],
})
export class ProductHistoriesModule {}
