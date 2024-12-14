import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductAttribute, ProductAttributeSchema } from 'src/database/schemas/product-attribute.schema'
import { AdminsModule } from '../admins/admins.module'
import { ProductAttributesController } from './product-attributes.controller'
import { ProductAttributesService } from './product-attributes.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductAttribute.name, schema: ProductAttributeSchema }]), AdminsModule],
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService],
})
export class ProductAttributesModule {}
