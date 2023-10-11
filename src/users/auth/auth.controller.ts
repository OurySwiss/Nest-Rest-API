import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  BadRequestException, // Add this line
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { Username: string; Password: string }) {
    console.log(body);
    if (!body.Username || !body.Password) {
      throw new BadRequestException('Username and password are required');
    }
    const user = await this.authService.validateUser(
      body.Username,
      body.Password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
