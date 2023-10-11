import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: number): Promise<Books> {
    const book = await this.booksRepository.findOne({
      where: { id },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async create(bookData: Partial<Books>): Promise<Books> {
    const newBook = this.booksRepository.create(bookData);
    return await this.booksRepository.save(newBook);
  }

  async update(id: number, updateData: Partial<Books>): Promise<Books> {
    await this.booksRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
