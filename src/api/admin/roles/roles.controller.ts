import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { RoleDto, roleDto } from './dto/roles.dto'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleEnum } from 'src/common/types/global.enum'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { RoleDtoSwagger } from './swagger/role.swagger'

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('admin/roles')
@UseGuards(AdminGuard, RoleGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả' })
  @Roles(RoleEnum.ROLE)
  async getAll() {
    return this.rolesService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết' })
  @ApiParam({ name: 'id', example: 'roleID', description: 'role ID' })
  @Roles(RoleEnum.ROLE)
  async getOne(@Param('id') id: string) {
    return this.rolesService.getOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Thêm mới' })
  @ApiBody({ type: RoleDtoSwagger })
  @Roles(RoleEnum.ROLE)
  @UseZodValidation(roleDto)
  async create(@Body() body: RoleDto) {
    return this.rolesService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật' })
  @ApiParam({ name: 'id', example: 'roleID', description: 'role ID' })
  @ApiBody({ type: RoleDtoSwagger })
  @Roles(RoleEnum.ROLE)
  @UseZodValidation(roleDto)
  async update(@Param('id') id: string, @Body() body: RoleDto) {
    return this.rolesService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
  @ApiParam({ name: 'id', example: 'roleID', description: 'role ID' })
  @Roles(RoleEnum.ROLE)
  async delete(@Param('id') id: string) {
    return this.rolesService.delete(id)
  }
}
