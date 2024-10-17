import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './schema/book.schema'
import { Model } from 'mongoose'
import { CreateBookDto } from './dto/create-book.dto'
import { updateBookDto } from './dto/update-book.dto'

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
  async getBookById(id: string): Promise<Book> {
    const getBook = await this.BookModel.findById(id).exec()
    return getBook
  }
  async updateBookById(
    id: string,
    updateBookDto: updateBookDto,
  ): Promise<Book> {
    const updatedBook = await this.BookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      {
        new: true,
      },
    ).exec()
    console.log(updatedBook)
    return updatedBook
  }
  async deleteBook(id: string): Promise<Book> {
    const deleteBook = await this.BookModel.findByIdAndDelete(id).exec()
    console.log(deleteBook)
    if (!deleteBook) throw new NotFoundException('id doesnot exist ')

    return deleteBook
  }
}
