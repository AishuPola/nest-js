import { Controller, Get } from '@nestjs/common'

@Controller('users') // /users
// @ is the decorator.
export class UsersController {
  @Get()
  findAll() {
    return []
  }
  @Get(':id')
  findOne() {}
}
