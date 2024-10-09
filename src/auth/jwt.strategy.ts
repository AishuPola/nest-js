import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
interface JwtPayload {
  sub: string
  email: string
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get('JWT_SECRET')
    console.log(secret)

    super({
      secretOrKey: configService.get('JWT_SECRET'),
      //   secretOrkey: 'your_jwt_secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
    })
  }
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, role: payload.role }
  }
}
