import { Body, Controller, Post } from '@nestjs/common'

import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { UseZodValidation } from 'src/common/decorators/zod.decorator'
import { AuthService } from './auth.service'
import { LoginDto, loginDto } from './dto/auth.dto'
import { LoginDtoSwagger, LogoutDtoSwagger, RefreshTokenSwagger } from './swagger/auth.swagger'

@ApiTags('Authentication')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Default response' })
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginDtoSwagger })
  @UseZodValidation(loginDto)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiBody({ type: LogoutDtoSwagger })
  async logout(@Body() body: { id: string }) {
    return this.authService.logout(body.id)
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: RefreshTokenSwagger })
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refresh(body.refresh_token)
  }
}
