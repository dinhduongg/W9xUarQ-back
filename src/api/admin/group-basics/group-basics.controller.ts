import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { GroupBasicsService } from './group-basics.service'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { GroupBasic } from 'src/database/schemas/group-basic.schema'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { GroupBasicSwagger } from './swagger/group-basics.swagger'

@ApiTags('Group basics')
@ApiBearerAuth()
@Controller('admin/group-basics')
@UseGuards(AdminGuard)
export class GroupBasicsController {
  constructor(private readonly groupBasicsService: GroupBasicsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách group basic' })
  async getAll() {
    return this.groupBasicsService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết group basic' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async getDetail(@Param('id') id: string) {
    return this.groupBasicsService.getDetail(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới group basic' })
  @ApiBody({ type: GroupBasicSwagger })
  async create(@Body() data: GroupBasic) {
    return this.groupBasicsService.create(data)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật group basic' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  @ApiBody({ type: GroupBasicSwagger })
  async update(@Param('id') id: string, @Body() data: GroupBasic) {
    return this.groupBasicsService.update(id, data)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa group basic' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async delete(@Param('id') id: string) {
    return this.groupBasicsService.delete(id)
  }
}
