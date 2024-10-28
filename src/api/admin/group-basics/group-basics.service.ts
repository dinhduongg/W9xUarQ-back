import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Basic } from 'src/database/schemas/basic.schema'
import { GroupBasic } from 'src/database/schemas/group-basic.schema'

@Injectable()
export class GroupBasicsService {
  constructor(
    @InjectModel(GroupBasic.name) private readonly groupBasicModel: Model<GroupBasic>,
    @InjectModel(Basic.name) private readonly basicModel: Model<Basic>,
  ) {}

  async getAll() {
    try {
      const groupBasics = await this.groupBasicModel.find().exec()
      return { group_basiscs: groupBasics }
    } catch (error) {
      throw error
    }
  }

  async getDetail(id: string) {
    try {
      const groupBasic = await this.groupBasicModel.findById(id).exec()
      return { group_basic: groupBasic }
    } catch (error) {
      throw error
    }
  }

  async create(data: GroupBasic) {
    try {
      const groupBasic = await this.groupBasicModel.create(data)
      return { group_basic: groupBasic }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: GroupBasic) {
    try {
      const groupBasic = await this.groupBasicModel.findByIdAndUpdate(id, data, { new: true }).exec()
      return { group_basic: groupBasic }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      const basics = await this.basicModel.find({ 'group_basic._id': id }).exec()

      for (const basic of basics) {
        basic.group_basic = null
        await basic.save()
      }

      await this.groupBasicModel.findByIdAndDelete(id).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
