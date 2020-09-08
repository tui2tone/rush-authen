import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizationToken = createParamDecorator(async (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['authorization'] ? req.headers['authorization'].replace("Bearer ", "") : '';
});