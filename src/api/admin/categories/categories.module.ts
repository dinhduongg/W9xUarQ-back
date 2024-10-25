import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Category, CategorySchema } from 'src/database/schemas/category.schema'
import { AdminsModule } from '../admins/admins.module'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), AdminsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
