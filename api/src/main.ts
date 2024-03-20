import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  LoggerInstance,
  LoggerMiddleware,
  TransformInterceptor,
  responseBodyFormatter,
} from '@api/core';
import { env } from 'node:process';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: LoggerInstance,
    }),
  });
  app.useGlobalPipes(new I18nValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new I18nValidationExceptionFilter({
      responseBodyFormatter,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(LoggerMiddleware);

  await app.listen(env['PORT'] || 3000, '0.0.0.0');
}
bootstrap();
