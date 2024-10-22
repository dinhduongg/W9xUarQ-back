import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { GlobalQuery } from 'src/common/types/global.type'
import { AdminsService } from './admins.service'
import { AdminDto, adminDto, ChangePasswordDto, changePasswordDto, UpdateDto, updateDto } from './dto/admins.dto'

@Controller(['admin/admins', 'admin/employees'])
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async getAll(@Query() query: GlobalQuery) {
    return this.adminsService.getAll(query)
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.adminsService.getOne(id)
  }

  @Post()
  @UseZodValidation(adminDto)
  async create(@Body() body: AdminDto) {
    return this.adminsService.create(body)
  }

  @Put(':id')
  @UseZodValidation(updateDto)
  async update(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.adminsService.update(id, body)
  }

  @Put('change-password/:id')
  @UseZodValidation(changePasswordDto)
  async changePassword(@Param('id') id: string, @Body() body: ChangePasswordDto) {
    return this.adminsService.changePassword(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminsService.delete(id)
  }
}
