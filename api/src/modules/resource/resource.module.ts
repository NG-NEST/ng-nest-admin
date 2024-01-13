import { Module } from '@nestjs/common';
import { ResourceResolver } from './resource.resolver';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';

@Module({
  controllers: [ResourceController],
  providers: [ResourceResolver, ResourceService]
})
export class ResourceModule {}
