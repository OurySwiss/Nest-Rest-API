import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateitemDto } from './dto/create-item-dto';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'Get all items';
  }

  @Post()
  create(@Body() createItemDto: CreateitemDto): string {
    return `Name: ${createItemDto.name} Desc: ${createItemDto.description}`;
  }
}
