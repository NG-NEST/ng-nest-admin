import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  // WsAdapter,
  LOGGER_INSTANCE,
  LoggerMiddleware,
  RedisIoAdapter,
  TransformInterceptor,
  responseBodyFormatter,
} from '@api/core';
import { env } from 'node:process';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: LOGGER_INSTANCE,
    }),
  });
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new I18nValidationExceptionFilter({
      responseBodyFormatter,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(LoggerMiddleware);

  app.register(multipart);

  // app.useWebSocketAdapter(new WsAdapter(app));
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(env['PORT'] || 3000, '0.0.0.0');
}
bootstrap();
