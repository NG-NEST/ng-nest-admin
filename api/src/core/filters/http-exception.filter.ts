import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class XHttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || exception.message.message || exception.message.error;

    const msg = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '请求异常',
      data: message
    };

    Logger.error('Error', JSON.stringify(message), 'XHttpExceptionFilter');

    response.status(status).json(msg);
  }
}
