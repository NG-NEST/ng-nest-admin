import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaSelect as PalJSPrismaSelect } from '@paljs/plugins';

export const PrismaSelect = createParamDecorator(
  (data: { modelName: string }, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    const art = new PalJSPrismaSelect(info);

    console.log(JSON.stringify(art.valueOf('data')));

    console.log(JSON.stringify(art.value));

    return art;
  }
);
