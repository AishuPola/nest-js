import { TaskStatus } from '../task.model'

export class GetTasksFilterdTO {
  status?: TaskStatus
  search?: string
}
