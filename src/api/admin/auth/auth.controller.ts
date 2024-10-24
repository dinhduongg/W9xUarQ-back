import { Body, Controller, Post } from '@nestjs/common'

import { ApiBadRequestResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { LoginDto, loginDto } from './dto/auth.dto'

@ApiTags('Authentication')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Default response' })
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseZodValidation(loginDto)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @Post('logout')
  async logout(@Body() body: { id: string }) {
    return this.authService.logout(body.id)
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refresh(body.refresh_token)
  }
}
