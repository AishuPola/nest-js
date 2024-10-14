import { Injectable, NotFoundException } from '@nestjs/common'

import { GetTasksFilteredDtO } from './dto/get-tasks-filter.dto'
import { Task } from './schemas/task.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
import { User } from 'src/users/schemas/user.schema'
@Injectable()
export class TasksService {
  // private tasks: Task[] = []

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  // getAllTasks() {
  //   return this.tasks
  // }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec()
  }
  // getTaskWithFilters(filterDto: GetTasksFilteredDtO): Task[] {
  //   const { status, search } = filterDto
  //   // define temp array to hold the result
  //   let tasks = this.getAllTasks()

  //   // do something with status

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }
  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true
  //       }
  //       return false
  //     })
  //   }
  //   // return final result
  //   return tasks
  // }

  getTaskWithFilters(filterDto: GetTasksFilteredDtO): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.taskModel.find()
    if (status) {
      query.where({ status })
    }
    if (search) {
      query.where({
        $or: [
          {
            title: { $regex: search, $options: 'i' },
          },
          {
            description: { $regex: search, $options: 'i' },
          },
        ],
      })
    }
    return query.exec()
  }

  // getTaskById(id: string): Task {
  //   // try to get task
  //   // if not found, throw an error(404)
  //   // other wise return the found task
  //   const task = this.tasks.find((task) => task.id === id)
  //   console.log(task)
  //   if (!task) {
  //     throw new NotFoundException(' not found task with particular id')
  //   }
  //   return task
  // }

  async getbyId(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }
    console.log(task)
    return task
  }
  //   createTask(title: string, description: string): Task {
  //     const task: Task = {
  //       id: uuidv4(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     }
  //     this.tasks.push(task)
  //     return task
  //   }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,

  //     status: TaskStatus.OPEN,
  //   }
  //   this.tasks.push(task)
  //   return task
  // }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = new this.taskModel({ ...createTaskDto, user })
    return newTask.save()
  }
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id)
  //   task.status = status
  //   console.log(task)
  //   return task
  // }

  updateTask(
    id: string,
    UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDto
    return this.taskModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec()
  }

  // deleteTask(id: string): Task {
  //   const removetask = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id! === id)
  //   console.log(removetask)
  //   return removetask
  // }

  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec()

    console.log(deletedTask)
    if (!deletedTask) throw new NotFoundException('id doesnot exist')
    return deletedTask
  }
}
