import { Module } from '@nestjs/common';
import { CatalogueResolver } from './catalogue.resolver';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from '@api/services';
import { AuthModule } from '../auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FilesInterceptor } from '@api/core';

@Module({
  imports: [AuthModule],
  controllers: [CatalogueController],
  providers: [
    CatalogueResolver,
    CatalogueService,
    { provide: APP_INTERCEPTOR, useClass: FilesInterceptor },
  ],
})
export class CatalogueModule {}
