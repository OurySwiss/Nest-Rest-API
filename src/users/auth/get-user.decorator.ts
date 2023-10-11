import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("🚀 ~ file: get-user.decorator.ts:7 ~ request.user:", request.user)
    return request.user;
  },
);
