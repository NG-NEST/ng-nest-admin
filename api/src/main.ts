import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, TransformInterceptor, logger } from '@api/core';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'node:process';
import { I18nValidationExceptionFilter, i18nValidationErrorFactory } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, exceptionFactory: i18nValidationErrorFactory }),
  );
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(env['PORT'] || 3000);
}
bootstrap();
