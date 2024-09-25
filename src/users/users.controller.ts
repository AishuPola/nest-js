/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
@Controller('users') // /users
// @ is the decorator.
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get() // get/ users or /users?role=value
  //users?role=value to get this, we use query params.
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.UsersService.findAll(role)
  }
  // @Get(':id') // Get users/:id
  // findOne(@Param('id') id: string) {
  //   return this.UsersService.findOne(+id)
  // }

  @Get(':id') // Get users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.findOne(id)
  }

  @Get('intern')
  findAllInterns() {
    return []
  }
  @Post()
  create(
    @Body()
    user: {
      name: string
      email: string
      role: 'INTERN' | 'ENGINEER' | 'ADMIN'
    },
  ) {
    return this.UsersService.create(user)
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    userupdate: {
      name?: string
      email?: string
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN'
    },
  ) {
    return this.UsersService.update(id, userupdate)
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.delete(id)
  }
}
