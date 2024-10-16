import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { Book } from './schema/book.schema'

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  async getallBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks()
  }
  @Post()
  async createBook(@Body() CreateBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(CreateBookDto)
  }
  @Get(':id')
  async getBookByIf(@Param('id') id: string) {
    return this.bookService.getBookById(id)
  }
}
