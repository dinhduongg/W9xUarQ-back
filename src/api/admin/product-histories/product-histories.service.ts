import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ProductHistory } from 'src/database/schemas/product-history.schema'
import { Product } from 'src/database/schemas/product.schema'

@Injectable()
export class ProductHistoriesService {
  constructor(
    @InjectModel(ProductHistory.name)
    private readonly productHistoryModel: Model<ProductHistory>,

    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(type_history: number, admin_name: string, product_id: string, content: string) {
    try {
      const productHistory = await this.productHistoryModel.create({
        type_history,
        admin_name,
        product_id,
        content,
      })

      if ([2, 3].includes(type_history)) {
        await this.productModel.findByIdAndUpdate(product_id, { history_update: productHistory }).exec()
      }

      return { product_history: productHistory }
    } catch (error) {
      throw error
    }
  }

  async deleteByProductId(product_id: string) {
    try {
      return await this.productHistoryModel.deleteMany({ product_id }).exec()
    } catch (error) {
      throw error
    }
  }
}
