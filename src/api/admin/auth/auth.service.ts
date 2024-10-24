import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AdminRole } from 'src/database/schemas/admin-role.schema'
import { Admin } from 'src/database/schemas/admin.schema'
import { LoginDto } from './dto/auth.dto'
import { JwtService } from './jwt.service'
import { AuthMapper } from './sub-files/auth.mapper'
import { JwtPayload } from 'src/common/types/global.type'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
    @InjectModel(AdminRole.name)
    private readonly adminRoleModel: Model<AdminRole>,

    private readonly jwtService: JwtService,
    private readonly mapper: AuthMapper,
  ) {}

  async login(body: LoginDto) {
    try {
      const admin = await this.adminModel.findOne({ email: body.email }).exec()

      if (!admin || !bcrypt.compareSync(body.password, admin.password)) {
        throw new Error('Tài khoản hoặc mật khẩu không chính xác!')
      }

      const adminRoles = await this.adminRoleModel.find({ admin_id: admin._id }).populate('role').exec()
      const accessToken = await this.jwtService.generateAccessToken({ id: admin._id, email: admin.email })
      const refreshToken = await this.jwtService.generateRefreshToken({ id: admin._id, email: admin.email })

      admin.is_login = true
      admin.refresh_token = refreshToken
      await admin.save()

      return {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          avatar: admin.avatar,
        },
        admin_roles: adminRoles.map((ar) => this.mapper.toAdminRole(ar)),
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    } catch (error) {
      throw error
    }
  }

  async logout(adminId: string) {
    try {
      await this.adminModel.updateOne({ _id: adminId }, { is_login: false, refresh_token: null }).exec()
      return { message: 'Thành công' }
    } catch (error) {
      throw error
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyRefreshToken(refreshToken)

      if (!payload) {
        throw new UnauthorizedException()
      }

      const accessToken = await this.jwtService.generateAccessToken({ id: payload.id, email: payload.email })
      const refreshTok = await this.jwtService.generateRefreshToken({ id: payload.id, email: payload.email })

      await this.adminModel.updateOne({ _id: payload.id }, { refresh_token: refreshTok }).exec()

      return { access_token: accessToken }
    } catch (error) {
      throw error
    }
  }
}
