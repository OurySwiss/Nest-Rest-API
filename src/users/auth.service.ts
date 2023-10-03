import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && bcrypt.compareSync(pass, user.Password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.Username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
