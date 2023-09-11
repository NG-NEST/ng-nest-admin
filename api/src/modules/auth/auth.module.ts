import { Module } from '@nestjs/common';
import { PrismaService } from '@api/core';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [PrismaService, AuthResolver, AuthService]
})
export class AuthModule {}
