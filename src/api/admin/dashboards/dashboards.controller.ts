import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { DashboardsService } from './dashboards.service'
import { dashboardDto, DashboardDto } from './dto/dashboards.dto'

@Controller('admin/dashboards')
@UseGuards(AdminGuard)
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.dashboardsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dashboardsService.findOne(id)
  }

  @Post()
  @UseZodValidation(dashboardDto)
  async create(@Body() body: DashboardDto) {
    return this.dashboardsService.create(body)
  }

  @Put(':id')
  @UseZodValidation(dashboardDto)
  async update(@Body() body: DashboardDto, @Param('id') id: string) {
    return this.dashboardsService.update(id, body)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dashboardsService.remove(id)
  }
}
