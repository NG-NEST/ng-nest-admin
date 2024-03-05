import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { getRequestLogs } from '../common';

type HostType = 'http' | 'ws' | 'rpc' | 'graphql';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: Prisma.PrismaClientKnownRequestError | HttpException,
    host: ArgumentsHost,
  ): void {
    const hostType = host.getType<HostType>();
    const { httpAdapter } = this.httpAdapterHost;

    if (hostType === 'graphql') {
    } else if (hostType === 'http') {
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      let message = '';
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        const spt = exception.message.split('\n');
        message = spt[spt.length - 1];
      } else if (exception instanceof HttpException) {
        const resp = exception.getResponse() as any;
        message = resp ? resp['message'] : exception.toString();
      }

      const msg = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: message,
      };

      Logger.error(
        JSON.stringify({
          ...msg,
          requset: getRequestLogs(request),
        }),
        exception.stack,
        'AllExceptionsFilter',
      );

      httpAdapter.reply(response, msg, httpStatus);
    }
  }
}
