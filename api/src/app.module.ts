import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoleModule, UserModule } from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    RoleModule
  ]
})
export class AppModule {}
