import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleModule, UserModule, AuthModule } from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GlobalServiceModule } from '@api/core';

@Module({
  imports: [
    GlobalServiceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    RoleModule
  ]
})
export class AppModule {}
