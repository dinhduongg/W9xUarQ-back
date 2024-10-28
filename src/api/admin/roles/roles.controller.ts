import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { RoleDto, roleDto } from './dto/roles.dto'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleEnum } from 'src/common/types/global.enum'

@Controller('admin/roles')
@UseGuards(AdminGuard, RoleGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(RoleEnum.ROLE)
  async getAll() {
    return this.rolesService.getAll()
  }

  @Get(':id')
  @Roles(RoleEnum.ROLE)
  async getOne(@Param('id') id: string) {
    return this.rolesService.getOne(id)
  }

  @Post()
  @Roles(RoleEnum.ROLE)
  @UseZodValidation(roleDto)
  async create(@Body() body: RoleDto) {
    return this.rolesService.create(body)
  }

  @Put(':id')
  @Roles(RoleEnum.ROLE)
  @UseZodValidation(roleDto)
  async update(@Param('id') id: string, @Body() body: RoleDto) {
    return this.rolesService.update(id, body)
  }

  @Delete(':id')
  @Roles(RoleEnum.ROLE)
  async delete(@Param('id') id: string) {
    return this.rolesService.delete(id)
  }
}
