import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Category } from 'src/database/schemas/category.schema'
import { CategoriesDto } from './dto/categories.dto'
import { makeNameSlug } from 'src/common/utilities/generate-slug'
import { CategoryQuery } from './sub-files/categories.query'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async getCategories(query: CategoryQuery) {
    try {
      const { parent_id } = query
      const where = {}

      if (parent_id) {
        where['parent'] = parent_id
      } else {
        where['parent'] = null
      }

      const categories = await this.categoryModel.find(where)

      return { categories }
    } catch (error) {
      throw error
    }
  }

  async getCategory(id: string) {
    try {
      const category = await this.categoryModel.findById(id)
      return { category }
    } catch (error) {
      throw error
    }
  }

  async createCategory(body: CategoriesDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const category = await this.categoryModel.create(body)
      return { category }
    } catch (error) {
      throw error
    }
  }

  async updateCategory(id: string, body: CategoriesDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const category = await this.categoryModel.findByIdAndUpdate(id, body, { new: true })

      return { category }
    } catch (error) {
      throw error
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.categoryModel.deleteMany({ parent: id })
      await this.categoryModel.findByIdAndDelete(id)
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
