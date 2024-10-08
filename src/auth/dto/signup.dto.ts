import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  email: string
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}
