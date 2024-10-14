import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { SignUpDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UsersService,
    private jwtservice: JwtService,
  ) {
    console.log(process.env.JWT_SECRET)
  }

  async LogIn(LoginDto: LoginDto): Promise<any> {
    const { email, password } = LoginDto
    // Find the user by email
    console.log('Looking for user with email:', email)
    const user = await this.userSerivce.findByEmail(email)

    if (!user) {
      console.error('User not found for email:', email)
      throw new UnauthorizedException('User not found')
    }
    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('ivalid password ')
    }
    // In the context of your JWT (JSON Web Token) implementation,
    //the payload is an object that contains the data you want to include in the token.
    // This data can be used later to identify the user and their permissions
    // when they access protected routes.
    const payload = { email: user.email, sub: user._id, role: user.role }
    // const token = this.jwtservice.sign(payload)
    const token = this.jwtservice.sign(payload, {
      secret: process.env.JWT_SECRET,
    })
    console.log(token)
    return { accessToken: token }
  }
  async signup(SignUpDto: SignUpDto): Promise<any> {
    const { name, email, password, role } = SignUpDto

    const existingUser = await this.userSerivce.findByEmail(email)
    // Check if the user already exists
    if (existingUser) {
      throw new ConflictException('user already exists')
    }
    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10)
    //create the user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {
      const newUser = await this.userSerivce.create({
        name,
        email,
        password: hashedPassword,
        role,
      })
      console.log(newUser)
      return newUser
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error (e.g., email already exists)
        throw new ConflictException('Email already registered')
      }
      // Re-throw the error if it's not a duplicate key error
      throw error
    }
  }
}
