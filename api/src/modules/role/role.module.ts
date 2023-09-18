import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';

@Module({
  providers: [RoleResolver]
})
export class RoleModule {}
