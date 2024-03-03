import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, TransformInterceptor } from '@api/core';
import { env } from 'node:process';
import { I18nMiddleware, I18nValidationExceptionFilter } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { loggerOptions } from './logger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: createLogger({ ...loggerOptions }) }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // exceptionFactory: (errors) => {
      //   throw new BadRequestException(errors);
      //   return errors;
      // },
    }),
  );
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(I18nMiddleware);

  app.enableCors();

  await app.listen(env['PORT'] || 3000);
}
bootstrap();
