import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { AdminRole, AdminRoleSchema } from 'src/database/schemas/admin-role.schema'
import { Admin, AdminSchema } from 'src/database/schemas/admin.schema'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtService } from './jwt.service'
import { AuthMapper } from './sub-files/auth.mapper'

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: AdminRole.name, schema: AdminRoleSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthMapper],
})
export class AuthModule {}
