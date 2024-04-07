import { Global, Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { CosService } from './cos.service';

const services = [PrismaService, RedisService, EncryptService, CosService];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class GlobalModule {}
