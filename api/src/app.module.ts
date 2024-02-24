import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleModule, UserModule, AuthModule, SubjectModule, ResourceModule } from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GlobalModule, StatusCode } from '@api/core';
import { GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
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
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    SubjectModule,
    ResourceModule,
  ],
})
export class AppModule {}
