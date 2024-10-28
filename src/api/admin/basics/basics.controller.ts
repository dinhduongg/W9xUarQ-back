import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { BasicsService } from './basics.service'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { BasicDto, basicDto } from './dto/basics.dto'
import { RoleGuard } from 'src/common/guards/role.guard'
import { RoleEnum } from 'src/common/types/global.enum'
import { Roles } from 'src/common/decorators/roles.decorator'

@Controller('admin/basics')
@UseGuards(AdminGuard, RoleGuard)
export class BasicsController {
  constructor(private readonly basicsService: BasicsService) {}

  @Get()
  async getBasics(@Query() query: any) {
    return this.basicsService.getBasics(query)
  }

  @Get(':id')
  async getBasic(@Param('id') id: string) {
    return this.basicsService.getBasic(id)
  }

  @Post()
  @Roles(RoleEnum.BASIC)
  @UseZodValidation(basicDto)
  async createBasic(@Body() body: BasicDto) {
    return this.basicsService.createBasic(body)
  }

  @Put(':id')
  @UseZodValidation(basicDto)
  async updateBasic(@Param('id') id: string, @Body() body: BasicDto) {
    return this.basicsService.updateBasic(id, body)
  }

  @Delete(':id')
  async deleteBasic(@Param('id') id: string) {
    return this.basicsService.deleteBasic(id)
  }
}
