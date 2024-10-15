import { IsEnum, IsNotEmpty, IsString, Max, Min } from 'class-validator'
import { BookReadingStatus } from '../schema/book.schema'

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsNotEmpty()
  @Min(0)
  price: number

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number
  @IsEnum(BookReadingStatus)
  status: BookReadingStatus
}
