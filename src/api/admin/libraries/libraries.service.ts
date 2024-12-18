import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CloudinaryService } from 'src/api/cloudinary/cloudinary.service'
import { UpoadFolderEnum } from 'src/common/types/global.enum'
import { GlobalQuery } from 'src/common/types/global.type'
import { findWithRegex } from 'src/common/utilities/mongo'
import { paginate } from 'src/common/utilities/pagination'

import { Library } from 'src/database/schemas/libraries.schema'

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel(Library.name) private readonly libraryModel: Model<Library>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getLibraries(query: GlobalQuery & { size: string }) {
    try {
      const { size, limit, page, q } = query
      const where = {}

      if (q) {
        where['file_name'] = findWithRegex(q)
      }

      if (size) {
        where['bytes'] = { $lt: parseInt(size) }
      }

      const libraries = await paginate<Library>(this.libraryModel, limit, page * limit, where, { created_at: -1 })

      return { libraries }
    } catch (error) {
      throw error
    }
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const res = await this.cloudinaryService.uploadImage(file, UpoadFolderEnum.LIBRARIES)

      const body = {
        public_id: res.public_id,
        format: res.format,
        bytes: res.bytes,
        file_name: res.original_filename,
        url: res.url,
        secure_url: res.secure_url,
      }

      const library = await this.libraryModel.create(body)

      return { library }
    } catch (error) {
      throw error
    }
  }

  async updateLibrary(file: Express.Multer.File, id: string) {
    try {
      const library = await this.libraryModel.findById(id).exec()

      if (!library) {
        throw new Error('Library not found')
      }

      await this.cloudinaryService.deleteImage(library.public_id)

      const res = await this.cloudinaryService.uploadImage(file, UpoadFolderEnum.LIBRARIES)

      const body = {
        public_id: res.public_id,
        format: res.format,
        bytes: res.bytes,
        file_name: res.original_filename,
        url: res.url,
        secure_url: res.secure_url,
      }

      const updatedLibrary = await this.libraryModel.findByIdAndUpdate(id, body, { new: true }).exec()

      return { library: updatedLibrary }
    } catch (error) {
      throw error
    }
  }

  async deleteLibrary(id: string) {
    try {
      const library = await this.libraryModel.findById(id).exec()

      if (!library) {
        throw new Error('Library not found')
      }

      await this.cloudinaryService.deleteImage(library.public_id)

      await this.libraryModel.findByIdAndDelete(id).exec()

      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
