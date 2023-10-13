import {
  Controller,
  Request,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { GetUser } from './auth/get-user.decorator';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const userIdFromToken = req.user.userId;

    if (userIdFromToken !== Number(id)) {
      throw new ForbiddenException('You can only access your own data');
    }
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: any) {
    try {
      await this.userService.create(userData);
      return { message: 'User successfully created' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem creating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, // Ensure id is a number
    @Body() updateUserDto: any,
    @GetUser() user: User,
  ) {
    if (user.id !== Number(id)) {
      throw new ForbiddenException('You can only update your own data');
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: User) {
    if (user.id !== Number(id)) {
      throw new ForbiddenException('You can only delete your own data');
    }
    return this.userService.remove(id.toString());
  }
}
