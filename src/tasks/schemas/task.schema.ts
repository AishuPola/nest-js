import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { TaskStatus } from '../task.model'
import { User } from 'src/users/schemas/user.schema'

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

  @Prop({ type: User, required: true })
  user: User
}

export const TaskSchema = SchemaFactory.createForClass(Task)
