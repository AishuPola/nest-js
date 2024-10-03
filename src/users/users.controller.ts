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
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
@Controller('users') // /users
// @ is the decorator.
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  // @Get() // get/ users or /users?role=value
  // //users?role=value to get this, we use query params.
  // findAll(
  //   @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  // ): Promise<User> {
  //   return this.UsersService.findAll(role)
  // }
  // @Get(':id') // Get users/:id
  // findOne(@Param('id') id: string) {
  //   return this.UsersService.findOne(+id)
  // }

  // @Get(':id') // Get users/:id
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.UsersService.findOne(id)
  // }

  // @Get('intern')
  // findAllInterns() {
  //   return []
  // }
  // @Post()
  // create(
  //   @Body(ValidationPipe)
  //   createUserDto: CreateUserDto,
  // ) {
  //   return this.UsersService.create(createUserDto)
  // }
  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe)
  //   updateUserDto: UpdateUserDto,
  // ) {
  //   return this.UsersService.update(id, updateUserDto)
  // }
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.UsersService.delete(id)
  // }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.UsersService.create(createUserDto)
  }
  @Get()
  async findAll(
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ): Promise<User[]> {
    return this.UsersService.findAll(role)
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.UsersService.findOne(id)
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.UsersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.UsersService.delete(id)
  }
}
