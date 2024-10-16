import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum BookReadingStatus {
  READING = 'READING',
  READ = 'READ',
  TO_READ = 'TO_READ',
}
@Schema()
export class Book {
  @Prop({
    required: true,
  })
  title: string
  @Prop({
    required: true,
  })
  description: string
  @Prop({
    required: true,
  })
  author: string
  @Prop({
    required: true,
  })
  price: number
  @Prop({
    required: true,
  })
  rating: number
  @Prop({
    enum: BookReadingStatus,
    required: true,
  })
  status: BookReadingStatus
}

export const BookSchema = SchemaFactory.createForClass(Book)
