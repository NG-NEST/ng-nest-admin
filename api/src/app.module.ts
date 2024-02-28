import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RoleModule,
  UserModule,
  AuthModule,
  SubjectModule,
  ResourceModule,
  PermissionModule,
} from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GlobalModule, StatusCode } from '@api/core';
import { GraphQLFormattedError } from 'graphql';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';

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
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('LANG'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        }
      }),
      resolvers: [AcceptLanguageResolver],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    SubjectModule,
    ResourceModule,
    PermissionModule,
  ],
})
export class AppModule {}
