import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetUser = createParamDecorator((_, ctx: ExecutionContextHost) => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
