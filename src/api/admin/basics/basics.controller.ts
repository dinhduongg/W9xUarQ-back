import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { RoleEnum } from 'src/common/types/global.enum'
import { BasicsService } from './basics.service'
import { BasicDto, basicDto } from './dto/basics.dto'
import { BasicDtoSwagger, BasicQuery } from './swagger/basics.swagger'

@ApiTags('Basics')
@ApiBearerAuth()
@Controller('admin/basics')
@UseGuards(AdminGuard, RoleGuard)
export class BasicsController {
  constructor(private readonly basicsService: BasicsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách config website' })
  @ApiQuery({ type: BasicQuery })
  async getBasics(@Query() query: any) {
    return this.basicsService.getBasics(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết config' })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  async getBasic(@Param('id') id: string) {
    return this.basicsService.getBasic(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới config' })
  @ApiBody({ type: BasicDtoSwagger })
  @Roles(RoleEnum.BASIC)
  @UseZodValidation(basicDto)
  async createBasic(@Body() body: BasicDto) {
    return this.basicsService.createBasic(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật config' })
  @ApiBody({ type: BasicDtoSwagger })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  @UseZodValidation(basicDto)
  async updateBasic(@Param('id') id: string, @Body() body: BasicDto) {
    return this.basicsService.updateBasic(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa config' })
  @ApiParam({ name: 'id', example: 'configId', description: 'config ID' })
  async deleteBasic(@Param('id') id: string) {
    return this.basicsService.deleteBasic(id)
  }
}
