import { Module } from '@nestjs/common';
import { PrismaService } from '@api/core';
import { UserResolver } from './user.resolver';

@Module({
  providers: [PrismaService, UserResolver]
})
export class UserModule {}
