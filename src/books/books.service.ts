import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './schema/book.schema'
import { Model } from 'mongoose'
import { CreateBookDto } from './dto/create-book.dto'

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

  async getAllBooks(): Promise<Book[]> {
    return this.BookModel.find().exec()
  }

  async createBook(CreateBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.BookModel(CreateBookDto)
    return newBook.save()
  }
}
