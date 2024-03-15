import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLFormattedError, GraphQLSchema, defaultFieldResolver } from 'graphql';
import { join } from 'path';
import { HEADER_EXCEPTION_DATA, StatusCode } from '../common';
import { Request } from 'express';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { GqlModuleOptions } from '@nestjs/graphql';

export function grapgQLConfig(): GqlModuleOptions & { [key: string]: any } {
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

export function upperDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }

      return fieldConfig;
    },
  });
}
