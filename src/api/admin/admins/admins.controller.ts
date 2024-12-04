import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'

import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { GlobalQuerySwagger } from 'src/common/swagger/global-dto'
import { RoleEnum } from 'src/common/types/global.enum'
import { GlobalQuery } from 'src/common/types/global.type'
import { AdminsService } from './admins.service'
import { AdminDto, adminDto, ChangePasswordDto, changePasswordDto, UpdateDto, updateDto } from './dto/admins.dto'
import { AdminDtoSwagger, ChangePasswordDtoSwagger, UpdateDtoSwagger, UserDto } from './swagger/admins.dto'

@ApiTags('Admins')
@ApiBearerAuth()
@Controller(['admin/admins', 'admin/employees'])
@UseGuards(AdminGuard, RoleGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách nhân viên' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @ApiQuery({ type: GlobalQuerySwagger })
  async getAll(@Query() query: GlobalQuery) {
    return this.adminsService.getAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết nhân viên' })
  @ApiParam({ name: 'id', example: 'admin123', description: 'Admin ID' })
  @ApiResponse({ status: 200, type: UserDto })
  async getOne(@Param('id') id: string) {
    return this.adminsService.getOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới nhân viên' })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiBody({ type: AdminDtoSwagger })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  @UseZodValidation(adminDto)
  async create(@Body() body: AdminDto) {
    return this.adminsService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiParam({ name: 'id', example: 'admin123', description: 'Admin ID' })
  @ApiResponse({ status: 201, type: UserDto })
  @ApiBody({ type: UpdateDtoSwagger })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  @UseZodValidation(updateDto)
  async update(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.adminsService.update(id, body)
  }

  @Put('change-password/:id')
  @ApiOperation({ summary: 'Thay đổi mật khẩu nhân viên' })
  @ApiParam({ name: 'id', example: 'admin123', description: 'Admin ID' })
  @ApiResponse({ status: 201, type: String })
  @ApiBody({ type: ChangePasswordDtoSwagger })
  @UseZodValidation(changePasswordDto)
  async changePassword(@Param('id') id: string, @Body() body: ChangePasswordDto) {
    return this.adminsService.changePassword(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa nhân viên' })
  @ApiParam({ name: 'id', example: 'admin123', description: 'Admin ID' })
  @ApiResponse({ status: 201, type: String })
  @Roles(RoleEnum.ADMIN, RoleEnum.EMPLOYEE)
  async delete(@Param('id') id: string) {
    return this.adminsService.delete(id)
  }
}
