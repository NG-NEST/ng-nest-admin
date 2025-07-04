import { Global, Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { CosService } from './cos.service';
import { I18nService } from './i18n.service';
import { TemplateService } from './template.service';

const services = [
  PrismaService,
  RedisService,
  EncryptService,
  I18nService,
  CosService,
  TemplateService,
];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class GlobalModule {}
