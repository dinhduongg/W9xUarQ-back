import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Product, ProductSchema } from 'src/database/schemas/product.schema'
import { AdminsModule } from '../admins/admins.module'
import { ProductHistoriesModule } from '../product-histories/product-histories.module'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), AdminsModule, ProductHistoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
