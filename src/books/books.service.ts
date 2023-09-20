import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book-dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: string): Promise<Book> {
    return this.booksRepository.findOneOrFail({ where: { id } });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    return await this.booksRepository.save(newBook);
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    const book = await this.booksRepository.findOneOrFail({ where: { id } });
    Object.assign(book, updateBookDto);
    return await this.booksRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
