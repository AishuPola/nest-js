import { TaskStatus } from '../task.model'

export class GetTasksFilteredDtO {
  status?: TaskStatus
  search?: string
}
