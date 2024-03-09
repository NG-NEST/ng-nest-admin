import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
  I18nValidationException,
  QueryResolver,
  i18nValidationMessage,
} from 'nestjs-i18n';
import { join } from 'path';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { Logs, getRequestLogs } from './logger.config';

export const i18nConfig: I18nAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.getOrThrow('LANG'),
    loaderOptions: {
      path: join(__dirname, '../../i18n/'),
      watch: true,
    },
    typesOutputPath: join(__dirname, '../../../src/generated/i18n.generated.ts'),
  }),
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
  inject: [ConfigService],
};

export const i18n = i18nValidationMessage<I18nTranslations>;

export function responseBodyFormatter(
  host: ArgumentsHost,
  exc: I18nValidationException,
  formattedErrors: object,
) {
  const ctx = host.switchToHttp();
  const httpStatus =
    exc instanceof HttpException ? exc.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

  const msg = {
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: ctx.getRequest()?.url,
    message:
      formattedErrors instanceof Array && formattedErrors.length === 1
        ? formattedErrors[0]
        : formattedErrors,
  };

  Logs.error(
    JSON.stringify({ ...msg, request: getRequestLogs(ctx.getRequest()), stack: exc.stack }),
    {
      context: 'ValidationExceptionFilter',
    },
  );

  return msg;
}
