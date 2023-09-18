import { Global, Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { PrismaService } from './prisma.service';

const services = [PrismaService, EncryptService];

@Global()
@Module({
  providers: [...services],
  exports: [...services]
})
export class GlobalServiceModule {}
