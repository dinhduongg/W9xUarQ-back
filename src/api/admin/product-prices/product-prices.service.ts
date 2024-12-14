import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as uuid from 'uuid'

import { Product } from 'src/database/schemas/product.schema'
import { ProductHistoriesService } from '../product-histories/product-histories.service'
import { AttributeDto, DeleteAttributeDto, ProductDiscountDto, ProductPriceDto, UpdatePriceDto } from './dto/product-prices.dto'
import { PayloadAdmin } from 'src/common/types/global.type'
import { Variant } from './swagger/product-prices.swagger'

@Injectable()
export class ProductPricesService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly productHistoriesService: ProductHistoriesService,
  ) {}

  variantWithUuid(variant: Variant) {
    return {
      ...variant,
      id: uuid.v4(),
      stock: 0,
      attributes: variant.attributes.map((attribute) => ({ ...attribute, id: uuid.v4() })),
    }
  }

  async addPrice(id: string, body: ProductPriceDto, admin: PayloadAdmin) {
    try {
      const { price, unique_price, variant } = body

      let updateData = {}
      let content = ''

      if (unique_price) {
        // sản phẩm không có biến thể về giá
        updateData = { price }
        content = 'Thêm giá sản phẩm'
      } else {
        updateData = { $push: { variants: this.variantWithUuid(variant) } }
        content = 'Thêm biến thể giá sản phẩm'
      }

      // const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
      const product = await this.productModel.findOneAndUpdate({ _id: id }, updateData, { new: true })

      // Tạo lịch sử sửa sản phẩm
      await this.productHistoriesService.create(3, admin.name, id, content)

      return { product }
    } catch (error) {
      throw error
    }
  }

  async updatePrice(id: string, body: UpdatePriceDto, admin: PayloadAdmin) {
    try {
      const { price, unique_price, variant_id } = body

      const where = { _id: id }
      let updateData = {}
      let content = ''

      if (unique_price) {
        updateData = { price }
        content = 'Cập nhật giá sản phẩm'
      } else {
        updateData = { 'variants.$.price': price, price: 0 }
        content = 'Cập nhật giá biến thể sản phẩm'
        where['variants.id'] = variant_id
      }

      const product = await this.productModel.findOneAndUpdate(where, { $set: updateData }, { new: true }).exec()

      // ghi lịch sử sửa sản phẩm
      await this.productHistoriesService.create(3, admin.name, id, content)

      return { product }
    } catch (error) {
      throw error
    }
  }

  async addAttribute(body: AttributeDto, admin: PayloadAdmin) {
    try {
      const { variant_id, product_id, attribute } = body
      const newAttribute = { id: uuid.v4(), ...attribute }

      const product = await this.productModel.findOneAndUpdate({ _id: product_id, 'variants.id': variant_id }, { $push: { 'variants.$.attributes': newAttribute } }, { new: true })

      // ghi lịch sử sửa sản phẩm
      await this.productHistoriesService.create(3, admin.name, product_id, 'Thêm thuộc tính cho biến thể giá sản phẩm')

      return { product }
    } catch (error) {
      throw error
    }
  }

  async deleteAttribute(body: DeleteAttributeDto, admin: PayloadAdmin) {
    try {
      const { attribute_id, variant_id, product_id } = body

      const product = await this.productModel.findOneAndUpdate(
        { _id: product_id, 'variants.id': variant_id },
        { $pull: { 'variants.$.attributes': { id: attribute_id } } },
        { new: true },
      )

      // ghi lịch sử sửa sản phẩm
      await this.productHistoriesService.create(3, admin.name, product_id, 'Xóa thuộc tính của biến thể giá sản phẩm')

      return { product }
    } catch (error) {
      throw error
    }
  }

  async discount(id: string, body: ProductDiscountDto, admin: PayloadAdmin) {
    try {
      const { type, value, active } = body

      const updateData = { discount: { type, value, active } }

      const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec()

      // ghi lịch sử sửa sản phẩm
      if (active == true) {
        await this.productHistoriesService.create(3, admin.name, id, 'Giảm giá sản phẩm')
      }

      return { product }
    } catch (error) {
      throw error
    }
  }
}
