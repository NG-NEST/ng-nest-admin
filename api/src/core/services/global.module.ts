import { Global, Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';

const services = [PrismaService, RedisService, EncryptService];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class GlobalModule {}
