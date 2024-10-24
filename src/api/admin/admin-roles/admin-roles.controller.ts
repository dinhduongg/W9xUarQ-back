import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { AdminRolesService } from './admin-roles.service'
import { AdminRoleDto, PermisionDto } from './sub-files/admin-roles.type'

@Controller('admin/admin-roles')
@UseGuards(AdminGuard)
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) {}

  @Post()
  async addRole(@Body() body: AdminRoleDto) {
    return this.adminRolesService.addRole(body)
  }

  @Delete()
  async removeRole(@Body() body: AdminRoleDto) {
    return this.adminRolesService.removeRole(body)
  }

  @Put('permision/:id')
  async updatePermision(@Param('id') id: string, @Body() body: PermisionDto) {
    return this.adminRolesService.updatePermision(id, body)
  }
}
