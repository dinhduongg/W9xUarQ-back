import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { CloudinaryService } from 'src/api/cloudinary/cloudinary.service'
import { findWithRegex } from 'src/common/utilities/mongo'
import { Library } from 'src/database/schemas/libraries.schema'
import { Slide } from 'src/database/schemas/slide.schema'
import { LibrariesService } from '../libraries/libraries.service'
import { SlideSchemaType } from './dto/slide.dto'
import { SlideQuery } from './sub-files/slides.dto'

@Injectable()
export class SlidesService {
  constructor(
    @InjectModel(Slide.name)
    private readonly slideModel: Model<Slide>,
    @InjectModel(Library.name)
    private readonly libraryModel: Model<Library>,

    private readonly librariesService: LibrariesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(query: SlideQuery) {
    try {
      const { q, platform } = query
      const where = {}

      if (q) {
        where['name'] = findWithRegex(q)
      }

      if (platform) {
        where['platform'] = platform
      }

      const slides = await this.slideModel.find(where).sort({ sorted: 1 }).exec()

      return { slides }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const slide = await this.slideModel.findById(id).exec()
      return { slide }
    } catch (error) {
      throw error
    }
  }

  async create(image: Express.Multer.File, body: SlideSchemaType) {
    try {
      if (!image && !body.image_url) {
        throw new UnprocessableEntityException({ image_url: 'Vui lòng chọn ảnh' })
      }

      if (image) {
        const library = await this.librariesService.uploadImage(image)
        body['image_url'] = library.library.url
      }

      const slide = await this.slideModel.create(body)

      return { slide }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, image: Express.Multer.File, body: SlideSchemaType) {
    try {
      const slide = await this.slideModel.findById(id).exec()

      if (!slide) {
        throw new Error('Slide not found')
      }

      if (image) {
        const library = await this.librariesService.uploadImage(image)
        body['image_url'] = library.library.url
      }

      await this.slideModel.findByIdAndUpdate(id, body)

      return { message: 'Cập nhật thành công' }
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const slide = await this.slideModel.findById(id).exec()
      const library = await this.libraryModel.findOne({ url: slide.image_url }).exec()

      await this.cloudinaryService.deleteImage(library.public_id)
      await this.libraryModel.findByIdAndDelete(library._id).exec()
      await this.slideModel.findByIdAndDelete(id).exec()

      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
