import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, TransformInterceptor, logger } from '@api/core';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  await app.listen(env['PORT'] || 3000);
}
bootstrap();
