import { TaskStatus } from '../task.model'
import { IsEnum, IsOptional, IsString } from 'class-validator'
export class GetTasksFilteredDtO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsString()
  search?: string
}
