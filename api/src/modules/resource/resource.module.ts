import { Module } from '@nestjs/common';
import { ResourceResolver } from './resource.resolver';
import { ResourceController } from './resource.controller';
import { ResourceService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResourceController],
  providers: [ResourceResolver, ResourceService],
})
export class ResourceModule {}
