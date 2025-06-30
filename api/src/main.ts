import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  // WsAdapter,
  LOGGER_INSTANCE,
  LOGS,
  LoggerMiddleware,
  RedisIoAdapter,
  TransformInterceptor,
  responseBodyFormatter,
} from '@api/core';
import { env, hrtime } from 'node:process';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const readyStart = hrtime();
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

  // app.useWebSocketAdapter(new WsAdapter(app));
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  app.register(fastifyMultipart as any, {
    limits: {
      fileSize: 1024 * 1024 * 10, // 10MB limit
      files: 200,
      fields: 100,
    },
    attachFieldsToBody: true,
  });

  await app.listen(env['PORT'] || 3000, '0.0.0.0');

  const port = await app.getUrl();
  const serverUrl = port.replace(/\/$/, '');

  const end = hrtime(readyStart);
  LOGS.info(`Application is running on: ${serverUrl}`, {
    context: 'NestApplication',
    ms: `+${(end[1] / 1000000).toFixed(0)}ms`,
  });
}
bootstrap();
