import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { StatusCode } from '../common';
import { Logs } from './logger.config';

export const grapgQLConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  formatError(error: GraphQLFormattedError) {
    let {
      message,
      extensions: { code, stacktrace },
    } = error;
    code = StatusCode(code as string);
    const msg = { code, message, timestamp: new Date().toISOString() };
    Logs.error(JSON.stringify({ ...msg, stack: (stacktrace as Array<string>).join('\n') }), {
      context: 'GraphQLModule',
    });
    return msg;
  },
};
