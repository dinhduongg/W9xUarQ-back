import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Information, InformationSchema } from 'src/database/schemas/information.schema'
import { AdminsModule } from '../admins/admins.module'
import { InformationsController } from './informations.controller'
import { InformationsService } from './informations.service'
import { Page, PageSchema } from 'src/database/schemas/page.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Information.name, schema: InformationSchema },
      { name: Page.name, schema: PageSchema },
    ]),
    AdminsModule,
  ],
  controllers: [InformationsController],
  providers: [InformationsService],
})
export class InformationsModule {}
