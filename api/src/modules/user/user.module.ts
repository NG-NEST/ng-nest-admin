import { Module } from '@nestjs/common';
import { PrismaService } from '@api/core';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserResolver, UserService]
})
export class UserModule {}
