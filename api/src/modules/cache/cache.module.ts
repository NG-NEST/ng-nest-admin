import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { AuthModule } from '../auth/auth.module';
import { CacheResolver } from './cache.resolver';
import { CacheService } from '@api/services';

@Module({
  imports: [AuthModule],
  controllers: [CacheController],
  providers: [CacheResolver, CacheService],
})
export class CacheModule {}
