import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  // private users = [
  //   {
  //     id: 1,
  //     name: 'Leanne Graham',
  //     email: 'Sincere@april.biz',
  //     role: 'INTERN',
  //   },
  //   {
  //     id: 2,
  //     name: 'Ervin Howell',
  //     email: 'Shanna@melissa.tv',
  //     role: 'INTERN',
  //   },
  //   {
  //     id: 3,
  //     name: 'Clementine Bauch',
  //     email: 'Nathan@yesenia.net',
  //     role: 'ENGINEER',
  //   },
  //   {
  //     id: 4,
  //     name: 'Patricia Lebsack',
  //     email: 'Julianne.OConner@kory.org',
  //     role: 'ENGINEER',
  //   },
  //   {
  //     id: 5,
  //     name: 'Chelsey Dietrich',
  //     email: 'Lucio_Hettinger@annie.ca',
  //     role: 'ADMIN',
  //   },
  // ]
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): Promise<User[]> {
    if (role) {
      const rolesArray = await this.userModel.find({ role }).exec()

      if (rolesArray.length === 0) {
        throw new NotFoundException('user role not found')
      }
      return rolesArray
    }
    return this.userModel.find().exec()
  }
  // findOne(id: number) {
  //   const user = this.users.find((user) => user.id === id)
  //   if (!user) throw new NotFoundException('user not found')
  //   return user
  // }
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id)
    if (!user) throw new NotFoundException('user not found')
    return user
  }

  // create(createUserDto: CreateUserDto) {
  //   const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
  //   const newUser = {
  //     id: usersByHighestId[0].id + 1,
  //     ...createUserDto,
  //   }
  //   this.users.push(newUser)
  //   return newUser
  // }

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto)

    return newUser.save()
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   this.users = this.users.map((user) => {
  //     if (user.id === id) {
  //       return { ...user, ...updateUserDto }
  //     }
  //     return user
  //   })
  //   return this.findOne(id)
  // }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
    if (!updatedUser) {
      throw new NotFoundException('User not found')
    }
    return updatedUser
  }

  // delete(id: number) {
  //   const removedUser = this.findOne(id)
  //   this.users = this.users.filter((user) => user.id !== id)
  //   return removedUser
  // }
  async delete(id: string): Promise<User> {
    const deleteUser = await this.userModel.findByIdAndDelete(id).exec()
    return deleteUser
  }
}
