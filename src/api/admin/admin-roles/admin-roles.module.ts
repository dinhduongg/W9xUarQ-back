import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AdminRole, AdminRoleSchema } from 'src/database/schemas/admin-role.schema'
import { AdminRolesController } from './admin-roles.controller'
import { AdminRolesService } from './admin-roles.service'
import { AdminsModule } from '../admins/admins.module' // for guards

@Module({
  imports: [MongooseModule.forFeature([{ name: AdminRole.name, schema: AdminRoleSchema }]), AdminsModule],
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
})
export class AdminRolesModule {}
