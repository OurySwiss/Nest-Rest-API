import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log("🚀 ~ file: JwtAuthGuard.ts:11 ~ JwtAuthGuard ~ handleRequest ~ user:", user)
    console.log("🚀 ~ file: JwtAuthGuard.ts:12 ~ JwtAuthGuard ~ handleRequest ~ err:", err)
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

