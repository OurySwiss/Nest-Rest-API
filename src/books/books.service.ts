import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const newBook = this.booksRepository.create(bookData);
    return await this.booksRepository.save(newBook);
  }

  async update(id: number, updateData: Partial<Book>): Promise<Book> {
    const existingBook = await this.booksRepository.findOne({
      where: {id}
    });
    if (!existingBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    try {
      await this.booksRepository.update(id, updateData);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating the book');
    }
  }

  async remove(id: number): Promise<void> {
    const existingBook = await this.booksRepository.findOne({
      where: {id}
    });
    if (!existingBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    try {
      await this.booksRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting the book');
    }
  }
}
