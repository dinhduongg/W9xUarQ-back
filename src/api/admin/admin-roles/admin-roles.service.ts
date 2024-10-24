import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AdminRole } from 'src/database/schemas/admin-role.schema'
import { AdminRoleDto, PermisionDto } from './sub-files/admin-roles.type'

@Injectable()
export class AdminRolesService {
  constructor(
    @InjectModel(AdminRole.name)
    private readonly model: Model<AdminRole>,
  ) {}

  async addRole(body: AdminRoleDto): Promise<{ admin_role: AdminRole }> {
    const adminRole = await this.model.create(body)
    return { admin_role: adminRole }
  }

  async removeRole(body: AdminRoleDto): Promise<{ admin_role: AdminRole }> {
    const adminRole = await this.model.findOneAndDelete(body)
    return { admin_role: adminRole }
  }

  async updatePermision(id: string, body: PermisionDto): Promise<{ admin_role: AdminRole }> {
    const adminRole = await this.model.findByIdAndUpdate(id, body, { new: true })
    return { admin_role: adminRole }
  }
}
