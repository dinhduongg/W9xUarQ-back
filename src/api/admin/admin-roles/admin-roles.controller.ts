import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { AdminRolesService } from './admin-roles.service'
import { AdminRoleDto, PermisionDto } from './sub-files/admin-roles.type'
import { AdminRoleDtoBodySwagger, AdminRoleDtoSwagger, PermisionDtoSwagger } from './swagger/admin-roles.swagger'

@ApiTags('Admin Roles')
@ApiBearerAuth()
@Controller('admin/admin-roles')
@UseGuards(AdminGuard)
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm quyền cho nhân viên' })
  @ApiResponse({ status: 201, type: AdminRoleDtoSwagger })
  @ApiBody({ type: AdminRoleDtoBodySwagger })
  async addRole(@Body() body: AdminRoleDto) {
    return this.adminRolesService.addRole(body)
  }

  @Delete()
  @ApiOperation({ summary: 'Xóa quyền của nhân viên' })
  @ApiResponse({ status: 201, type: AdminRoleDtoSwagger })
  @ApiBody({ type: AdminRoleDtoBodySwagger })
  async removeRole(@Body() body: AdminRoleDto) {
    return this.adminRolesService.removeRole(body)
  }

  @Put('permision/:id')
  @ApiOperation({ summary: 'Cập nhật quyền thêm, sửa, xóa, đọc của nhân viên' })
  @ApiResponse({ status: 201, type: AdminRoleDtoSwagger })
  @ApiBody({ type: PermisionDtoSwagger })
  async updatePermision(@Param('id') id: string, @Body() body: PermisionDto) {
    return this.adminRolesService.updatePermision(id, body)
  }
}
