import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common'; // Import hinzugefügt
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
