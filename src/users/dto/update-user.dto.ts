/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDto } from './create-user.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
