import { Module } from '@nestjs/common';
import { CatalogueResolver } from './catalogue.resolver';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService, UploadService } from '@api/services';
import { AuthModule } from '../auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FilesInterceptor } from '@api/core';
import { FileModule } from '../file';

@Module({
  imports: [AuthModule, FileModule],
  controllers: [CatalogueController],
  providers: [
    CatalogueResolver,
    CatalogueService,
    UploadService,
    { provide: APP_INTERCEPTOR, useClass: FilesInterceptor },
  ],
})
export class CatalogueModule {}
