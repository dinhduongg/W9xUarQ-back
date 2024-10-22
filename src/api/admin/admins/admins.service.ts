import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'

import { GlobalQuery } from 'src/common/types/global.type'
import { Admin } from 'src/database/schemas/admin.schema'
import { AdminDto, ChangePasswordDto, UpdateDto } from './dto/admins.dto'

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
  ) {}

  async getAll(query: GlobalQuery): Promise<{ admins: Admin[] }> {
    try {
      const where = {}

      if (query.q) {
        where['$or'] = [{ name: { $regex: query.q, $options: 'i' } }, { email: { $regex: query.q, $options: 'i' } }]
      }

      const admins = await this.adminModel.find(where, { password: 0 })
      return { admins }
    } catch (error) {
      throw error
    }
  }

  async getOne(id: string): Promise<{ admin: Admin }> {
    try {
      const admin = await this.adminModel.findById(id, { password: 0 })
      return { admin }
    } catch (error) {
      throw error
    }
  }

  async create(data: AdminDto): Promise<{ admin: Admin }> {
    try {
      const isExist = await this.adminModel.exists({ email: data.email })

      if (isExist) {
        throw new UnprocessableEntityException({ email: 'Email đã tồn tại' })
      }

      const admin = await this.adminModel.create(data)
      return { admin }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: UpdateDto): Promise<{ admin: Admin }> {
    try {
      if (data.is_enable === false) {
        data['locked_at'] = new Date()
      } else {
        data['locked_at'] = null
      }

      const admin = await this.adminModel.findByIdAndUpdate({ id }, data, { new: true, projection: { password: 0 } })

      return { admin }
    } catch (error) {
      throw error
    }
  }

  async changePassword(id: string, body: ChangePasswordDto): Promise<{ message: string }> {
    try {
      const admin = await this.adminModel.findById(id)

      if (!admin) {
        throw new UnprocessableEntityException({ password: 'Admin không tồn tại' })
      }

      const salt = await bcrypt.genSalt()
      const hashed = await bcrypt.hash(body.password, salt)

      admin.password = hashed
      await admin.save()

      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      await this.adminModel.findByIdAndDelete(id)
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
