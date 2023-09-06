import { ExceptionFilter, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

type HostType = 'http' | 'ws' | 'rpc' | 'graphql';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: unknown, host: ExecutionContextHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const httpAdapter = this.httpAdapterHost;

    const hostType = host.getType() as HostType;

    if (hostType === 'graphql') {
        
    } else if (hostType === 'http') {
    }

    // const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // const responseBody = {
    //   statusCode: httpStatus,
    //   timestamp: new Date().toISOString(),
    //   path: httpAdapter.getRequestUrl(ctx.getRequest())
    // };

    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
