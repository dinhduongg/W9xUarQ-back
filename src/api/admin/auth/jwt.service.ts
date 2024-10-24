import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as TokenService } from '@nestjs/jwt'

import { TokenPayload } from './sub-files/type'
import { JwtPayload } from 'src/common/types/global.type'

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('jwt.access_token_secret')
    const token = await this.jwtService.signAsync(payload, { secret, expiresIn: '15m' })
    return token
  }

  async generateRefreshToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('jwt.refresh_token_secret')
    const token = await this.jwtService.signAsync(payload, { secret, expiresIn: '7d' })
    return token
  }

  async verifyRefreshToken(token: string) {
    const secret = this.configService.get<string>('jwt.refresh_token_secret')
    const payload: JwtPayload = await this.jwtService.verifyAsync(token, { secret })
    return payload || null
  }
}
