import { Module } from '@nestjs/common'

import { AdminRolesModule } from './admin-roles/admin-roles.module'
import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'

@Module({
  imports: [AuthModule, AdminsModule, RolesModule, AdminRolesModule],
})
export class AdminModule {}
