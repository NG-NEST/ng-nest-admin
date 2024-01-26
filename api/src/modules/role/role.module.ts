import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleController } from './role.controller';
import { RoleService } from '@api/services';

@Module({
  controllers: [RoleController],
  providers: [RoleResolver, RoleService]
})
export class RoleModule {}
