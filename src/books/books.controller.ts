import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { CreateBookDto } from './dto/create-book.dto'
import { Book } from './schema/book.schema'
import { updateBookDto } from './dto/update-book.dto'

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
  async getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id)
  }
  @Patch(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() updateBookDto: updateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, updateBookDto)
  }
  @Delete(':id')
  deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBook(id)
  }
}
