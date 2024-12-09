import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { DashboardsService } from './dashboards.service'
import { dashboardDto, DashboardDto } from './dto/dashboards.dto'
import { DashboardDtoSwagger, DashBoardQuery } from './swagger/dashboards.swagger'

@ApiTags('Dashboards')
@ApiBearerAuth()
@Controller('admin/dashboards')
@UseGuards(AdminGuard)
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách dashboards' })
  @ApiQuery({ type: DashBoardQuery })
  async findAll(@Query() query: any) {
    return this.dashboardsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết dashboard' })
  @ApiParam({ name: 'id', example: 'dashboardID', description: 'dashboard ID' })
  async findOne(@Param('id') id: string) {
    return this.dashboardsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới dashboard' })
  @ApiBody({ type: DashboardDtoSwagger })
  @UseZodValidation(dashboardDto)
  async create(@Body() body: DashboardDto) {
    return this.dashboardsService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật dashboard' })
  @ApiParam({ name: 'id', example: 'dashboardID', description: 'dashboard ID' })
  @ApiBody({ type: DashboardDtoSwagger })
  @UseZodValidation(dashboardDto)
  async update(@Body() body: DashboardDto, @Param('id') id: string) {
    return this.dashboardsService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa dashboard' })
  @ApiParam({ name: 'id', example: 'dashboardID', description: 'dashboard ID' })
  async remove(@Param('id') id: string) {
    return this.dashboardsService.remove(id)
  }
}
