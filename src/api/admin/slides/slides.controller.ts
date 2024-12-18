import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { SlidesService } from './slides.service'
import { SlideQuery } from './sub-files/slides.dto'
import { SliderBodySwagger, SliderQuerySwagger } from './swagger/slides.swagger'
import { SlideSchemaType } from './dto/slide.dto'

@ApiTags('Slides')
@ApiBearerAuth()
@Controller('admin/slides')
@UseGuards(AdminGuard)
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả' })
  @ApiQuery({ type: SliderQuerySwagger })
  async findAll(@Query() query: SlideQuery) {
    return this.slidesService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết' })
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async findOne(@Param('id') id: string) {
    return this.slidesService.findOne(id)
  }

  @Post()
  @ApiBody({ type: SliderBodySwagger })
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: Express.Multer.File, @Body() body: SlideSchemaType) {
    return this.slidesService.create(image, body)
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  @ApiBody({ type: SliderBodySwagger })
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string, @UploadedFile() image: Express.Multer.File, @Body() body: SlideSchemaType) {
    return this.slidesService.update(id, image, body)
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: 'id', description: 'ID' })
  async remove(@Param('id') id: string) {
    return this.slidesService.remove(id)
  }
}
