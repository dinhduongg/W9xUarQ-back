import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Dashboard, DashboardSchema } from 'src/database/schemas/dashboard.schema'
import { AdminsModule } from '../admins/admins.module'
import { DashboardsController } from './dashboards.controller'
import { DashboardsService } from './dashboards.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Dashboard.name, schema: DashboardSchema }]), AdminsModule],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
