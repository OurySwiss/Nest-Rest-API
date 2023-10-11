import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.Password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.Username, sub: user.id };
    console.log("🚀 ~ file: auth.service.ts:28 ~ AuthService ~ login ~ payload:", payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
