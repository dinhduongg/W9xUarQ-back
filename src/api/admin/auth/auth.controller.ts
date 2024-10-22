import { Controller } from '@nestjs/common'

import { ApiBadRequestResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@ApiTags('Authentication')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Default response' })
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
