import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { HEADER_EXCEPTION_DATA, StatusCode } from '../common';
import { Request } from 'express';

export function grapgQLConfig() {
  let req!: Request;
  return {
    req: null as any,
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    context(e: Request) {
      req = e;
    },
    formatError(error: GraphQLFormattedError) {
      let {
        message,
        extensions: { code, stacktrace },
      } = error;

      code = StatusCode(code as string);
      const msg = { code, message, timestamp: new Date().toISOString() };

      req.headers[HEADER_EXCEPTION_DATA] = JSON.stringify({
        ...msg,
        stack: (stacktrace as Array<string>).join('\n'),
      });

      return msg;
    },
  };
}
