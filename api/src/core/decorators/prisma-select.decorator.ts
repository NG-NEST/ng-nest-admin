import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaSelect as PalJSPrismaSelect } from '@paljs/plugins';

export const PrismaSelect = createParamDecorator((property: string, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  const info = gqlContext.getInfo();

  const art = new PalJSPrismaSelect(info);

  if (property) {
    return art.valueOf(property);
  } else {
    return art.value;
  }
});
