import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() userData: any) {
    console.log('Received userData:', userData);
    await this.userService.create(userData);
    return { message: 'User successfully created' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    await this.userService.update(id, updateUserDto);
    return { message: 'User successfully updated' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return { message: 'User successfully deleted' };
  }
}
