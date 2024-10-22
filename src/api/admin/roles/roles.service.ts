import { Injectable } from '@nestjs/common'
import { RoleDto } from './dto/roles.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Role } from 'src/database/schemas/role.schema'
import { Model } from 'mongoose'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly model: Model<Role>,
  ) {}

  async getAll(): Promise<{ roles: Role[] }> {
    try {
      const roles = await this.model.find()
      return { roles }
    } catch (error) {
      throw error
    }
  }

  async getOne(id: string): Promise<{ role: Role }> {
    try {
      const role = await this.model.findById(id)
      return { role }
    } catch (error) {
      throw error
    }
  }

  async create(body: RoleDto): Promise<{ role: Role }> {
    try {
      const role = await this.model.create(body)
      return { role }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, body: RoleDto): Promise<{ role: Role }> {
    try {
      const role = await this.model.findByIdAndUpdate(id, body, { new: true })
      return { role }
    } catch (error) {
      throw error
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      await this.model.findByIdAndDelete(id)
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }
}
