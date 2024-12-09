import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { InformationDto, informationDto } from './dto/informations.dto'
import { InformationsService } from './informations.service'
import { InformationDtoSwagger } from './swagger/informations.swagger'

@ApiTags('Informations')
@ApiBearerAuth()
@Controller('admin/informations')
@UseGuards(AdminGuard)
export class InformationsController {
  constructor(private readonly informationsService: InformationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách' })
  async getAll() {
    return this.informationsService.getAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết' })
  @ApiParam({ name: 'id', example: 'informationID', description: 'information ID' })
  async getDetail(@Param('id') id: string) {
    return this.informationsService.getDetail(id)
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới' })
  @ApiBody({ type: InformationDtoSwagger })
  @UseZodValidation(informationDto)
  async create(@Body() body: InformationDto) {
    return this.informationsService.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật' })
  @ApiParam({ name: 'id', example: 'informationID', description: 'information ID' })
  @ApiBody({ type: InformationDtoSwagger })
  @UseZodValidation(informationDto)
  async update(@Param('id') id: string, @Body() body: InformationDto) {
    return this.informationsService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
  @ApiParam({ name: 'id', example: 'informationID', description: 'information ID' })
  async delete(@Param('id') id: string) {
    return this.informationsService.delete(id)
  }
}
