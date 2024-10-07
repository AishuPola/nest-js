export class SignUpDto {
  name: string
  email: string
  password: string
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}
