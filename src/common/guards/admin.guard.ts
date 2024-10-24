import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { AdminsService } from 'src/api/admin/admins/admins.service'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { JwtPayload } from '../types/global.type'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    const secret = this.configService.get<string>('jwt.access_token_secret')

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, { secret })

      const result = await this.adminService.getOne(payload.id)
      const admin = result.admin
      const roleNames = result.admin_roles.map((ar) => ar.role.code)

      request['admin'] = {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        roles: roleNames,
      }

      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
