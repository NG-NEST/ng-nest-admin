import { ExceptionFilter, Catch, HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { getRequestLogs } from '../config';
import {
  ClearCustomHeaders,
  ClearMultipartFiles,
  ContextType,
  HEADER_EXCEPTION_DATA,
  SafeStringify,
} from '../common';

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
      // Graphql exceptions cannot be handled interceptor callbacks, only in the corresponding configuration format
    } else if (hostType === 'http') {
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      let message = '';
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      let res: any;

      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        const spt = exception.message.split('\n');
        message = spt[spt.length - 1];
      } else if (exception instanceof HttpException) {
        const resp = exception.getResponse() as any;
        message = resp ? resp['message'] : exception.toString();
        if (resp) {
          res = resp;
        }
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      const msg = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: message,
      };

      ClearCustomHeaders(request);

      const contentType = request.headers['content-type']?.toLowerCase();
      const isMultipart = contentType?.includes('multipart/form-data');
      if (isMultipart) {
        ClearMultipartFiles(request);
      }

      request.headers[HEADER_EXCEPTION_DATA] = SafeStringify({
        ...msg,
        requset: getRequestLogs(request),
        response: res,
        stack: exception.stack,
      });

      httpAdapter.reply(response, msg, httpStatus);
    }
  }
}
