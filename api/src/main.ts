import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  LoggerInstance,
  TransformInterceptor,
  responseBodyFormatter,
} from '@api/core';
import { env } from 'node:process';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: LoggerInstance,
    }),
  });

  app.useGlobalPipes(new I18nValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new I18nValidationExceptionFilter({
      responseBodyFormatter,
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(I18nMiddleware);

  app.enableCors();

  await app.listen(env['PORT'] || 3000);
}
bootstrap();
