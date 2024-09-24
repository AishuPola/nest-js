import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

@Controller('users') // /users
// @ is the decorator.
export class UsersController {
  @Get() // get/ users or /users?role=value
  //users?role=value to get this, we use query params.
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return []
  }
  @Get(':id') // Get users/:id
  findOne(@Param('id') id: string) {
    return { id }
  }
  @Get('intern')
  findAllInterns() {
    return []
  }
  @Post()
  create(@Body() user: {}) {
    return user
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() userupdate: {}) {
    return { id, ...userupdate }
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id }
  }
}
