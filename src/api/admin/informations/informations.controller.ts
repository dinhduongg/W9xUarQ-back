import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { InformationDto, informationDto } from './dto/informations.dto'
import { InformationsService } from './informations.service'

@Controller('admin/informations')
@UseGuards(AdminGuard)
export class InformationsController {
  constructor(private readonly informationsService: InformationsService) {}

  @Get()
  async getAll() {
    return this.informationsService.getAll()
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.informationsService.getDetail(id)
  }

  @Post()
  @UseZodValidation(informationDto)
  async create(@Body() body: InformationDto) {
    return this.informationsService.create(body)
  }

  @Put(':id')
  @UseZodValidation(informationDto)
  async update(@Param('id') id: string, @Body() body: InformationDto) {
    return this.informationsService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.informationsService.delete(id)
  }
}
