import { ExceptionFilter, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { Logger as Log4js } from '../common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Prisma } from '@prisma/client';

type HostType = 'http' | 'ws' | 'rpc' | 'graphql';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: Prisma.PrismaClientKnownRequestError | any, host: ExecutionContextHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    // const _httpAdapter = this.httpAdapterHost;
    console.log(this.httpAdapterHost);

    const hostType = host.getType<HostType>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '';
    if (hostType === 'graphql') {
    } else if (hostType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        const spt = exception.message.split('\n');
        message = spt[spt.length - 1];
      } else {
        message = exception.getResponse()?.message || exception.toString();
      }

      const msg = {
        statusCode: status,
        timestamp: new Date(),
        path: request?.url,
        message: message
      };

      Logger.error('Error', msg, 'HttpExceptionFilter');

      const logFormat = ` [Request original url]: ${request?.originalUrl}
  [Method]: ${request?.method}
  [IP]: ${request?.ip}
  [Status code]: ${status}
  [Response]: ${exception.toString()}`;

      Log4js.error(logFormat);

      response.status(status).json(msg);
    }
  }
}
