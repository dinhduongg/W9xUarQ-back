import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from './config/configuration'
import { DatabaseModule } from './database/database.module'
import { AdminModule } from './api/admin/admin.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: ['.env.development', '.env'] }), DatabaseModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
