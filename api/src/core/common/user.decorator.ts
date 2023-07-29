import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserEntity = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => GqlExecutionContext.create(ctx).getContext().req.user
);
