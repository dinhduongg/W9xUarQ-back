import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { GroupBasicsService } from './group-basics.service'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { GroupBasic } from 'src/database/schemas/group-basic.schema'

@Controller('admin/group-basics')
@UseGuards(AdminGuard)
export class GroupBasicsController {
  constructor(private readonly groupBasicsService: GroupBasicsService) {}

  @Get()
  async getAll() {
    return this.groupBasicsService.getAll()
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.groupBasicsService.getDetail(id)
  }

  @Post()
  async create(@Body() data: GroupBasic) {
    return this.groupBasicsService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: GroupBasic) {
    return this.groupBasicsService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.groupBasicsService.delete(id)
  }
}
