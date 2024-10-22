import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AdminsModule } from './admins/admins.module'
import { RolesModule } from './roles/roles.module'

@Module({
  imports: [AuthModule, AdminsModule, RolesModule],
})
export class AdminModule {}
