import { Module } from '@nestjs/common';
import { CatalogueResolver } from './catalogue.resolver';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService, FileService, UploadService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CatalogueController],
  providers: [UploadService, FileService, CatalogueResolver, CatalogueService],
})
export class CatalogueModule {}
