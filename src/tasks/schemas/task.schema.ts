import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { TaskStatus } from '../task.model'

@Schema()
export class Task {
  @Prop({
    required: true,
  })
  title: string
  @Prop({
    required: true,
  })
  description: string

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task)
