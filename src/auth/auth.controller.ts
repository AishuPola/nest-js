import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { SignUpDto } from './dto/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return this.authservice.LogIn(LoginDto)
  }
  @Post('signup')
  async signup(@Body() SignUpDto: SignUpDto) {
    return this.authservice.signup(SignUpDto)
  }
}
