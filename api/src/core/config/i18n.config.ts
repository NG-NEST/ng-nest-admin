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
import { getRequestLogs } from './logger.config';
import { ClearCustomHeaders, HEADER_EXCEPTION_DATA } from '../common';

export const i18nConfig: I18nAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.getOrThrow('LANGUAGE'),
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
  const req = ctx.getRequest();

  const msg = {
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: req.url,
    message:
      formattedErrors instanceof Array && formattedErrors.length === 1
        ? formattedErrors[0]
        : formattedErrors,
  };

  ClearCustomHeaders(req);

  req.headers[HEADER_EXCEPTION_DATA] = JSON.stringify({
    ...msg,
    request: getRequestLogs(req),
    stack: exc.stack,
  });

  return msg;
}
