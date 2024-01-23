import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
  providers: [PermissionResolver, PermissionService]
})
export class PermissionModule {}
