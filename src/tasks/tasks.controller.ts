import { Body, Controller, Get, Post } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks()
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    // console.log('body', body)
    // console.log('title:', title)
    // console.log('description:', description)

    return this.taskService.createTask(CreateTaskDto)
  }
}
