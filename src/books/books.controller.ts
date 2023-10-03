import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../users/JwtAuthGuard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() bookData: any) {
    return this.booksService.create(bookData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: any) {
    return this.booksService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
