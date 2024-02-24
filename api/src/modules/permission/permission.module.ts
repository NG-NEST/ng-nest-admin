import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionController } from './permission.controller';
import { PermissionService } from '@api/services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PermissionController],
  providers: [PermissionResolver, PermissionService],
})
export class PermissionModule {}
