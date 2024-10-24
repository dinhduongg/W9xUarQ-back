import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Role, RoleSchema } from 'src/database/schemas/role.schema'
import { AdminsModule } from '../admins/admins.module'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), AdminsModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
