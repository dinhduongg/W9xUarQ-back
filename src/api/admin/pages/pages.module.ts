import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Page, PageSchema } from 'src/database/schemas/page.schema'
import { AdminsModule } from '../admins/admins.module'
import { PagesController } from './pages.controller'
import { PagesService } from './pages.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]), AdminsModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
