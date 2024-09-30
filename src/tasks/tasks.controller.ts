import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks()
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    // console.log('body', body)
    // console.log('title:', title)
    // console.log('description:', description)

    return this.taskService.createTask(CreateTaskDto)
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string): Task {
    return this.taskService.deleteTask(id)
  }
  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTask(id, status)
  }
}
