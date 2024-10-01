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
import { TasksService } from './tasks.service'
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilteredDtO } from './dto/get-tasks-filter.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(): Task[] {
  //   return this.taskService.getAllTasks()
  // }
  @Get()
  getTasks(@Query() filterDto: GetTasksFilteredDtO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto)
    } else {
      return this.taskService.getAllTasks()
    }
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
    // @Body('status') status: TaskStatus,
    // instead of updating status directly
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    // return this.taskService.updateTask(id, status)
    const { status } = UpdateTaskStatusDto
    return this.taskService.updateTask(id, status)
  }
}
