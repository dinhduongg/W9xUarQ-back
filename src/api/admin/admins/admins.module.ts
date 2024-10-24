import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Admin, AdminSchema } from 'src/database/schemas/admin.schema'
import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'
import { AdminRole, AdminRoleSchema } from 'src/database/schemas/admin-role.schema'
import { AdminMapper } from './sub-files/admins.mapper'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: AdminRole.name, schema: AdminRoleSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminMapper],
  exports: [AdminsService],
})
export class AdminsModule {}
