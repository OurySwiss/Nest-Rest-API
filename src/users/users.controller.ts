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
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { GetUser } from './auth/get-user.decorator';
import { UserEntity } from './entity/user.entity';

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
    console.log("🚀 ~ file: users.controller.ts:32 ~ UserController ~ findOne ~ id:", typeof(id))
    const userIdFromToken = req.user.userId;
    console.log("🚀 ~ file: users.controller.ts:33 ~ UserController ~ findOne ~ req.user.userId:", typeof(req.user.userId))
    console.log(req.user);
    console.log("🚀 ~ file: users.controller.ts:34 ~ UserController ~ findOne ~ req.user:", req.user)
    
    if (userIdFromToken !== +id) {
      throw new ForbiddenException('You can only access your own data');
    }
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: any) {
    await this.userService.create(userData);
    return { message: 'User successfully created' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: any,
    @GetUser() user: UserEntity,
  ) {
    if (user.id !== +id) {
      throw new ForbiddenException('You can only update your own data');
    }
    return this.userService.update(id.toString(), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: UserEntity) {
    if (user.id !== +id) {
      throw new ForbiddenException('You can only delete your own data');
    }
    return this.userService.remove(id.toString());
  }
}
