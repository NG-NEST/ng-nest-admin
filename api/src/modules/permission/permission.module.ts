import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionController } from './permission.controller';
import { PermissionService } from '@api/services';

@Module({
  controllers: [PermissionController],
  providers: [PermissionResolver, PermissionService]
})
export class PermissionModule {}
