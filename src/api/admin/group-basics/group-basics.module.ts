import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Basic, BasicSchema } from 'src/database/schemas/basic.schema'
import { GroupBasic, GroupBasicSchema } from 'src/database/schemas/group-basic.schema'
import { AdminsModule } from '../admins/admins.module'
import { GroupBasicsController } from './group-basics.controller'
import { GroupBasicsService } from './group-basics.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupBasic.name, schema: GroupBasicSchema },
      { name: Basic.name, schema: BasicSchema },
    ]),
    AdminsModule,
  ],
  controllers: [GroupBasicsController],
  providers: [GroupBasicsService],
})
export class GroupBasicsModule {}
