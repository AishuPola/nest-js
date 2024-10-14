import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
// import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilteredDtO } from './dto/get-tasks-filter.dto'
import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
// import { filter } from 'rxjs'
import { Task } from './schemas/task.schema'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(): Task[] {
  //   return this.taskService.getAllTasks()
  // }
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilteredDtO): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto)
  //   } else {
  //     return this.taskService.getAllTasks()
  //   }
  // }
  @Get()
  async getTasks(@Query() filterDto: GetTasksFilteredDtO): Promise<any> {
    if (Object.keys(filterDto).length) {
      return await this.taskService.getTaskWithFilters(filterDto)
    } else {
      return await this.taskService.getAllTasks()
    }
  }

  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id)
  // }
  @Get(':id')
  getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getbyId(id)
  }

  // @Post()
  // createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
  //   // console.log('body', body)
  //   // console.log('title:', title)
  //   // console.log('description:', description)

  @Post()
  async createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(CreateTaskDto)
  }
  //   return this.taskService.createTask(CreateTaskDto)
  // }
  // @Delete(':id')
  // deleteTask(@Param('id') id: string): Task {
  //   return this.taskService.deleteTask(id)
  // }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, UpdateTaskStatusDto)
  }
  // @Patch(':id')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   // @Body('status') status: TaskStatus,
  //   // instead of updating status directly
  //   @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   // return this.taskService.updateTask(id, status)
  //   const { status } = UpdateTaskStatusDto
  //   return this.taskService.updateTask(id, status)
  // }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id)
  }
}
