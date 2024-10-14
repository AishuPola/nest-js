import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import mongoose from 'mongoose'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/schemas/user.schema'
interface JwtPayload {
  sub: string
  email: string
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private configService: ConfigService,
  ) {
    const secret = configService.get('JWT_SECRET')
    console.log('❤️', secret)

    super({
      secretOrKey: configService.get('JWT_SECRET'),
      //   secretOrkey: 'your_jwt_secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
    })
  }
  async validate(payload: JwtPayload) {
    const { sub } = payload
    console.log(sub)
    const user = await this.userModel.findById(sub)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('the user cannot perform crud operations')
    }
    return user
  }
}
