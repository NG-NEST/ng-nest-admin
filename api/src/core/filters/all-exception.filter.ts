import { ExceptionFilter, Catch, HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { getRequestLogs } from '../config';
import { ContextType, HEADER_EXCEPTION_DATA } from '../common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: Prisma.PrismaClientKnownRequestError | HttpException | Error,
    host: ArgumentsHost,
  ): void {
    const hostType = host.getType<ContextType>();
    const { httpAdapter } = this.httpAdapterHost;

    if (hostType === 'graphql') {
      // Graphql exception cannot be callback, output exception information through corresponding configuration formatting
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
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      const msg = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: message,
      };

      request.headers[HEADER_EXCEPTION_DATA] = JSON.stringify({
        ...msg,
        requset: getRequestLogs(request),
        stack: exception.stack,
      });

      httpAdapter.reply(response, msg, httpStatus);
    }
  }
}
