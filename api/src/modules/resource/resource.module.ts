import { Module } from '@nestjs/common';
import { ResourceResolver } from './resource.resolver';
import { ResourceController } from './resource.controller';
import { ResourceService } from '@api/services';

@Module({
  controllers: [ResourceController],
  providers: [ResourceResolver, ResourceService]
})
export class ResourceModule {}
