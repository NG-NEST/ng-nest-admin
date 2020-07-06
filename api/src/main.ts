import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { XHttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new XHttpExceptionFilter());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('ng-nest-admin-api')
    .setDescription('The ng-nest-admin-api description')
    .setVersion('1.0')
    .addTag('ng-nest-admin-api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
