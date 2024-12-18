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
import { DashboardsModule } from './dashboards/dashboards.module'
import { LibrariesModule } from './libraries/libraries.module'
import { ProductAttributesModule } from './product-attributes/product-attributes.module'
import { ProductsModule } from './products/products.module'
import { ProductHistoriesModule } from './product-histories/product-histories.module'
import { ProductPricesModule } from './product-prices/product-prices.module'
import { SlidesModule } from './slides/slides.module'

@Module({
  imports: [
    AuthModule,
    AdminsModule,
    RolesModule,
    AdminRolesModule,
    CategoriesModule,
    InformationsModule,
    PagesModule,
    GroupBasicsModule,
    BasicsModule,
    DashboardsModule,
    LibrariesModule,
    ProductAttributesModule,
    ProductsModule,
    ProductHistoriesModule,
    ProductPricesModule,
    SlidesModule,
  ],
})
export class AdminModule {}
