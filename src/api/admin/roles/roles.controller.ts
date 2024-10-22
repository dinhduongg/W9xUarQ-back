import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { RolesService } from './roles.service'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { RoleDto, roleDto } from './dto/roles.dto'

@Controller('admin/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAll() {
    return this.rolesService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.rolesService.getOne(id)
  }

  @Post()
  @UseZodValidation(roleDto)
  async create(@Body() body: RoleDto) {
    return this.rolesService.create(body)
  }

  @Put(':id')
  @UseZodValidation(roleDto)
  async update(@Param('id') id: string, @Body() body: RoleDto) {
    return this.rolesService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.rolesService.delete(id)
  }
}
