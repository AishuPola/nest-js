/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/schemas/user.schema'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: config.get<string | number>('JWT_EXPRESS'),
    //     },
    //   }),
    // }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const secret = configService.get<string>('JWT_SECRET')
    //     const expiresIn = configService.get<string | number>('JWT_EXPRESS')
    //     console.log(configService.get('JWT_SECRET'))
    //     console.log(process.env.JWT_SECRET)
    //     console.log('JWT_SECRET:', secret)
    //     console.log('JWT_EXPRESS:', expiresIn)
    //     // if (!secret) {
    //     //   throw new Error('JWT_SECRET is not set in environment variables')
    //     // }
    //     return {
    //       secret,
    //       signOptions: {
    //         expiresIn,
    //       },
    //     }
    //   },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'JWT_SECRET',
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
