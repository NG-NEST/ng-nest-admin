import { Module } from '@nestjs/common';
import { CatalogueResolver } from './catalogue.resolver';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CatalogueController],
  providers: [CatalogueResolver, CatalogueService],
})
export class CatalogueModule {}
