import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { Logs } from '../config';

@Injectable()
export class RedisService extends Redis implements OnModuleInit {
  constructor(config: ConfigService) {
    const redisOptions: RedisOptions = {
      // host: config.getOrThrow('REDIS_HOST'),
      // port: config.getOrThrow('REDIS_PORT'),
      // db: config.getOrThrow('REDIS_TOKEN_DB'),
      // password: config.getOrThrow('REDIS_PASSWORD'),
      retryStrategy: () => {
        Logs.error('Redis connection failed', { context: RedisService.name });
        return null;
      },
    };

    super(config.getOrThrow('REDIS_URL'), redisOptions);
  }
  async onModuleInit() {
    this.on('ready', () => {
      Logger.log('Redis connected', RedisService.name);
    });
    this.on('error', (error: Error) => {
      Logs.error(error.message, { context: RedisService.name });
    });
  }
}
