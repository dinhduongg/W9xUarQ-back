import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as TokenService } from '@nestjs/jwt'

import { TokenPayload } from './sub-files/type'

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('jwt.access_token_secret')
    const token = this.jwtService.signAsync(payload, { secret, expiresIn: '10p' })
    return token
  }

  async generateRefreshToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('jwt.refresh_token_secret')
    const token = this.jwtService.signAsync(payload, { secret, expiresIn: '1y' })
    return token
  }
}
