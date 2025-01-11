import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { GlobalQuery } from 'src/common/types/global.type'
import { makeNameSlug } from 'src/common/utilities/generate-slug'
import { findWithRegex } from 'src/common/utilities/mongo'
import { Page } from 'src/database/schemas/page.schema'
import { PageDto } from './dto/pages.dto'

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private readonly pageModel: Model<Page>) {}

  async getAll(query: GlobalQuery) {
    try {
      const { q } = query
      const where = {}

      if (q) {
        where['name'] = findWithRegex(q)
      }

      const pages = await this.pageModel.find(where).populate({ path: 'information', select: 'name' }).sort({ created_at: -1 }).exec()
      return { pages }
    } catch (error) {
      throw error
    }
  }

  async getDetail(id: string) {
    try {
      const page = await this.pageModel.findById(id).exec()
      return { page }
    } catch (error) {
      throw error
    }
  }

  async create(body: PageDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const page = await this.pageModel.create(body)
      return { page }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: PageDto) {
    try {
      const slug = makeNameSlug(body.name)
      body['slug'] = slug

      const page = await this.pageModel.findByIdAndUpdate(id, body, { new: true }).exec()
      return { page }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      await this.pageModel.findByIdAndDelete(id).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
