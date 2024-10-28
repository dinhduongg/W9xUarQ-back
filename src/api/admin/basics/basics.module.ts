import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Basic, BasicSchema } from 'src/database/schemas/basic.schema'
import { BasicsController } from './basics.controller'
import { BasicsService } from './basics.service'
import { AdminsModule } from '../admins/admins.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Basic.name, schema: BasicSchema }]), AdminsModule],
  controllers: [BasicsController],
  providers: [BasicsService],
})
export class BasicsModule {}
