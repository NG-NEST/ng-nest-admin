import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  RoleModule,
  UserModule,
  AuthModule,
  SubjectModule,
  ResourceModule,
  PermissionModule,
  DictionaryModule,
  LanguageModule,
  CacheModule as LocalCacheModule,
  LogsModule,
  SchemaModule,
} from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import {
  CacheClearInterceptor,
  CacheInterceptor,
  GlobalModule,
  grapgQLConfig,
  i18nConfig,
} from '@api/core';
import { I18nModule } from 'nestjs-i18n';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot(grapgQLConfig()),
    I18nModule.forRootAsync(i18nConfig),
    CacheModule.register({
      isGlobal: true,
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
    DictionaryModule,
    LanguageModule,
    LocalCacheModule,
    LogsModule,
    SchemaModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CacheClearInterceptor },
  ],
})
export class AppModule {}
