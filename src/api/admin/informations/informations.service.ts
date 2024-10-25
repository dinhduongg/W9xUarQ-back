import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { makeNameSlug } from 'src/common/utilities/generate-slug'
import { Information } from 'src/database/schemas/information.schema'
import { InformationDto } from './dto/informations.dto'
import { Page } from 'src/database/schemas/page.schema'

@Injectable()
export class InformationsService {
  constructor(
    @InjectModel(Information.name) private readonly informationModel: Model<Information>,
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
  ) {}

  async getAll() {
    try {
      const informations = await this.informationModel.find({}).exec()
      return { informations }
    } catch (error) {
      throw error
    }
  }

  async getDetail(id: string) {
    try {
      const information = await this.informationModel.findById(id).exec()
      return { information }
    } catch (error) {
      throw error
    }
  }

  async create(body: InformationDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const information = await this.informationModel.create(body)
      return { information }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: InformationDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const information = await this.informationModel.findByIdAndUpdate(id, body, { new: true }).exec()
      return { information }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      await this.pageModel.deleteMany({ information: id }).exec()
      await this.informationModel.findByIdAndDelete(id).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
