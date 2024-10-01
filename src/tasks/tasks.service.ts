import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'

import { GetTasksFilteredDtO } from './dto/get-tasks-filter.dto'
@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }
  getTaskWithFilters(filterDto: GetTasksFilteredDtO): Task[] {
    const { status, search } = filterDto
    // define temp array to hold the result
    let tasks = this.getAllTasks()

    // do something with status

    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }
    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true
        }
        return false
      })
    }
    // return final result
    return tasks
  }

  getTaskById(id: string): Task {
    // try to get task
    // if not found, throw an error(404)
    // other wise return the found task
    const task = this.tasks.find((task) => task.id === id)
    console.log(task)
    if (!task) {
      throw new NotFoundException(' not found task with particular id')
    }
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

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task: Task = {
      id: uuidv4(),
      title,
      description,

      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }
  deleteTask(id: string): Task {
    const removetask = this.getTaskById(id)
    this.tasks = this.tasks.filter((task) => task.id! === id)
    console.log(removetask)
    return removetask
  }
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id)
    task.status = status
    console.log(task)
    return task
  }
}
