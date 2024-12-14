import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { GlobalQuery, PayloadAdmin } from 'src/common/types/global.type'
import { makeNameSlug } from 'src/common/utilities/generate-slug'
import { findWithRegex, isObjectId } from 'src/common/utilities/mongo'
import { paginate } from 'src/common/utilities/pagination'
import { Product } from 'src/database/schemas/product.schema'
import { ProductHistoriesService } from '../product-histories/product-histories.service'
import { CreateProductDto, ProductQuery, UpdateProductDto } from './dto/product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly productHistoryService: ProductHistoriesService,
  ) {}

  async findAll(query: ProductQuery) {
    try {
      const { limit, page, q, category_id, product_id } = query
      const where = { deleted_at: null } // lấy những sản phẩm chưa bị ẩn

      if (product_id) {
        where['_id'] = product_id

        const product = await this.productModel.findOne(where)

        return product
      } else {
        if (q) {
          where['$or'] = [{ name: findWithRegex(q) }, ...(isObjectId(q) ? [{ _id: q }] : [])]
        }

        if (category_id) {
          where['category_id'] = category_id
        }

        const products = await paginate<Product>(this.productModel, limit, page * limit, where, { created_at: -1 })

        return { products }
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec()

      return { product }
    } catch (error) {
      throw error
    }
  }

  async quickSearch(query: GlobalQuery) {
    try {
      const { q, limit } = query
      const where = { deleted_at: null }

      if (!q) {
        return { products: [] }
      }

      where['$or'] = [{ name: findWithRegex(q) }, ...(isObjectId(q) ? [{ _id: q }] : [])]

      const products = await this.productModel
        .find(where)
        .limit(limit ?? 10)
        .sort({ created_at: -1 })
        .exec()

      return { products }
    } catch (error) {
      throw error
    }
  }

  async create(body: CreateProductDto, admin: PayloadAdmin) {
    try {
      const error = {}

      if (body.name) {
        const isExistProduct = await this.productModel.findOne({ name: body.name }).exec()
        if (isExistProduct) {
          error['name'] = 'Tên tiếng Việt đã tồn tại'
        }
      }

      if (body.name_en) {
        const isExistProduct = await this.productModel.findOne({ name_en: body.name_en }).exec()
        if (isExistProduct) {
          error['name_en'] = 'Tên tiếng Anh đã tồn tại'
        }
      }

      if (Object.keys(error).length > 0) {
        throw new UnprocessableEntityException(error)
      }

      if (!body.custom_slug) {
        const slug = makeNameSlug(body.name)
        body['slug'] = slug
      }

      delete body.custom_slug

      const product = await this.productModel.create(body)

      // tạo lịch sử tạo sản phẩm
      const historyCreate = await this.productHistoryService.create(1, admin.name, product._id, 'Tạo sản phẩm')

      await this.productModel.findByIdAndUpdate(product._id, { history_create: historyCreate.product_history }).exec()

      return { product }
    } catch (error) {
      throw error
    }
  }

  async restore(id: string) {
    try {
      await this.productModel.findByIdAndUpdate(id, { deleted_at: null, admin_name: '' }).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }

  async softDelete(id: string, admin: PayloadAdmin) {
    try {
      await this.productModel.findByIdAndUpdate(id, { deleted_at: new Date(), admin_name: admin.name }).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      // xóa lịch sử sản phẩm
      await this.productHistoryService.deleteByProductId(id)

      // xóa sản phẩm
      await this.productModel.findByIdAndDelete(id).exec()

      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: UpdateProductDto, admin: PayloadAdmin) {
    try {
      const isUpdateName = body.is_update_name
      const customSlug = body.custom_slug

      if (isUpdateName) {
        const error = {}

        if (body.name) {
          const isExistProduct = await this.productModel.findOne({ name: body.name }).exec()
          if (isExistProduct) {
            error['name'] = 'Tên tiếng Việt đã tồn tại'
          }
        }

        if (body.name_en) {
          const isExistProduct = await this.productModel.findOne({ name_en: body.name_en }).exec()
          if (isExistProduct) {
            error['name_en'] = 'Tên tiếng Anh đã tồn tại'
          }
        }

        if (Object.keys(error).length > 0) {
          throw new UnprocessableEntityException(error)
        }

        if (!customSlug) {
          const slug = makeNameSlug(body.name)
          body['slug'] = slug
        }
      }

      if (body.hasOwnProperty('additional_description')) {
        body['additional_description'] = body.additional_description.split(',').filter(Boolean) as any
      }

      if (body.hasOwnProperty('additional_description_en')) {
        body['additional_description_en'] = body.additional_description_en.split(',').filter(Boolean) as any
      }

      // xóa những trường không có trong bảng product
      delete body.is_update_name
      delete body.custom_slug

      if (body.hasOwnProperty('unique_price')) {
        if (body.unique_price == true) {
          body['variants'] = []
        } else if (body.unique_price == false) {
          body['price'] = 0
        }
      }

      const updatedProduct = await this.productModel.findByIdAndUpdate(id, body, { new: true }).exec()

      const contentUpdate = []

      if (updatedProduct.isModified('name')) {
        contentUpdate.push('Tên tiếng Việt')
      }

      if (updatedProduct.isModified('name_en')) {
        contentUpdate.push('Tên tiếng Anh')
      }

      if (updatedProduct.isModified('description')) {
        contentUpdate.push('Mô tả tiếng Việt')
      }

      if (updatedProduct.isModified('description_en')) {
        contentUpdate.push('Mô tả tiếng Anh')
      }

      if (updatedProduct.isModified('additional_description')) {
        contentUpdate.push('Mô tả phụ tiếng Việt')
      }

      if (updatedProduct.isModified('additional_description_en')) {
        contentUpdate.push('Mô tả phụ tiếng Anh')
      }

      if (updatedProduct.isModified('meta_title')) {
        contentUpdate.push('Meta title tiếng Việt')
      }

      if (updatedProduct.isModified('meta_title_en')) {
        contentUpdate.push('Meta title tiếng Anh')
      }

      if (updatedProduct.isModified('meta_description')) {
        contentUpdate.push('Meta description tiếng Việt')
      }

      if (updatedProduct.isModified('meta_description_en')) {
        contentUpdate.push('Meta description tiếng Anh')
      }

      const strContent = contentUpdate.join(', ')

      if (strContent) {
        await this.productHistoryService.create(2, admin.name, id, strContent)
      }

      return { product: updatedProduct }
    } catch (error) {
      throw error
    }
  }
}
