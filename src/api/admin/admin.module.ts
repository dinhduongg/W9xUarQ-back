import { Module } from '@nestjs/common'

import { AdminRolesModule } from './admin-roles/admin-roles.module'
import { AdminsModule } from './admins/admins.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { CategoriesModule } from './categories/categories.module'
import { InformationsModule } from './informations/informations.module'
import { PagesModule } from './pages/pages.module'
import { GroupBasicsModule } from './group-basics/group-basics.module'
import { BasicsModule } from './basics/basics.module'

@Module({
  imports: [AuthModule, AdminsModule, RolesModule, AdminRolesModule, CategoriesModule, InformationsModule, PagesModule, GroupBasicsModule, BasicsModule],
})
export class AdminModule {}
