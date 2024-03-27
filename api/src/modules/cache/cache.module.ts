import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { AuthModule } from '../auth/auth.module';
import { CacheResolver } from './cache.resolver';
import { CacheService } from '@api/services';
import { CacheClearInterceptor, CacheInterceptor } from '@api/core';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule],
  controllers: [CacheController],
  providers: [
    CacheResolver,
    CacheService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CacheClearInterceptor },
  ],
})
export class CacheModule {}
