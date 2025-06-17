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
  AigcModule,
  UploadModule,
  CatalogueModule,
  VariableModule,
  VariableCategoryModule,
} from '@api/modules';
import { GraphQLModule } from '@nestjs/graphql';
import { GlobalModule, grapgQLConfig, I18N_CONFING } from '@api/core';
import { I18nModule } from 'nestjs-i18n';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    GlobalModule,
    GraphQLModule.forRoot(grapgQLConfig()),
    I18nModule.forRootAsync(I18N_CONFING),
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
    AigcModule,
    UploadModule,
    CatalogueModule,
    VariableModule,
    VariableCategoryModule,
  ],
})
export class AppModule {}
