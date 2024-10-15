import { Body, Controller, Post } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { Book } from './schema/book.schema'

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async createBook(@Body() CreateBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(CreateBookDto)
  }
}
