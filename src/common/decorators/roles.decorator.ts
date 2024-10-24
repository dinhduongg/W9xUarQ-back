import { SetMetadata } from '@nestjs/common'
import { RoleEnum } from '../types/global.enum'

export const Roles = (...roles: RoleEnum[]): any => SetMetadata('roles', roles)
