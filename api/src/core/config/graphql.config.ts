import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { StatusCode } from '../common';

export const grapgQLConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  formatError(error: GraphQLFormattedError) {
    let {
      message,
      extensions: { code },
    } = error;
    code = StatusCode(code as string);
    return { code, message, timestamp: new Date().toISOString() };
  },
};
