import { ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { I18nValidationException, i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

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
    message: formattedErrors,
  };

  Logger.error(JSON.stringify(msg), exc.stack, 'I18nValidationExceptionFilter');

  return msg;
}

