import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Basic } from 'src/database/schemas/basic.schema'
import { BasicDto } from './dto/basics.dto'

@Injectable()
export class BasicsService {
  constructor(@InjectModel(Basic.name) private readonly basicModel: Model<Basic>) {}

  async getBasics(query: any) {
    try {
      const group_number = query.group_number
      const where = {}

      if (group_number) {
        if (+group_number == -1) {
          where['group_basic.number'] = { $eq: null }
        } else {
          where['group_basic.number'] = group_number
        }
      }

      const basics = await this.basicModel.find(where).exec()
      return { basics }
    } catch (error) {
      throw error
    }
  }

  async getBasic(id: string) {
    try {
      const basic = await this.basicModel.findById(id)
      return { basic }
    } catch (error) {
      throw error
    }
  }

  async createBasic(body: BasicDto) {
    try {
      const basic = await this.basicModel.create(body)
      return { basic }
    } catch (error) {
      throw error
    }
  }

  async updateBasic(id: string, body: BasicDto) {
    try {
      const basic = await this.basicModel.findByIdAndUpdate(id, body, { new: true }).exec()
      return { basic }
    } catch (error) {
      throw error
    }
  }

  async deleteBasic(id: string) {
    try {
      await this.basicModel.findByIdAndDelete(id).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
