import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AdminModule } from './api/admin/admin.module'
import configuration from './config/configuration'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: ['.env.development', '.env'] }),
    JwtModule.register({ global: true }),
    DatabaseModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
