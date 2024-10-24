import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PayloadAdmin } from '../types/global.type'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as PayloadAdmin

    //console.log('roles--->>', roles,user.authorities.some((role) => roles.indexOf(role) >= 0))
    // return user && user.authorities && user.authorities.some((role) => roles.indexOf(role) >= 0)
    if (!(user && user.roles && user.roles.some((role) => roles.indexOf(role) >= 0))) {
      throw new ForbiddenException('Bạn không có quyền sử dụng chức năng này')
    }

    return user && user.roles && user.roles.some((role) => roles.indexOf(role) >= 0)
  }
}
