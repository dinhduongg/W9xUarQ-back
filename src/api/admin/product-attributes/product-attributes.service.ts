import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProductAttribute } from 'src/database/schemas/product-attribute.schema'
import { ProductAttributeDto } from './dto/product-attributes.dto'

@Injectable()
export class ProductAttributesService {
  constructor(
    @InjectModel(ProductAttribute.name)
    private readonly productAttributeModel: Model<ProductAttribute>,
  ) {}

  async getAll() {
    try {
      const productAttributes = await this.productAttributeModel.find().exec()
      return { product_attributes: productAttributes }
    } catch (error) {
      throw error
    }
  }

  async getDetail(id: string) {
    try {
      const productAttribute = await this.productAttributeModel.findById(id).exec()
      return { product_attribute: productAttribute }
    } catch (error) {
      throw error
    }
  }

  async create(body: ProductAttributeDto) {
    try {
      const productAttribute = await this.productAttributeModel.create(body)
      return { product_attribute: productAttribute }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: ProductAttributeDto) {
    try {
      // TODO: cập nhật attribute của sản phẩm dùng attribute này

      const productAttribute = await this.productAttributeModel.findByIdAndUpdate(id, body, { new: true }).exec()
      return { product_attribute: productAttribute }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      await this.productAttributeModel.findByIdAndDelete(id).exec()
      return { message: 'Xóa thành công' }
    } catch (error) {
      throw error
    }
  }
}
