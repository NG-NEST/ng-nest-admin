import { Module } from '@nestjs/common';
import { PrismaService } from '@api/core';
import { RoleResolver } from './role.resolver';

@Module({
  providers: [PrismaService, RoleResolver]
})
export class RoleModule {}
