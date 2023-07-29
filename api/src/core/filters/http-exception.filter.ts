import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Logger as Log4js } from '../common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const { message } = exception.getResponse() as any;

    const msg = {
      statusCode: status,
      timestamp: new Date(),
      path: request.url,
      message: '请求异常',
      data: message
    };

    Logger.error('Error', msg, 'HttpExceptionFilter');

    const logFormat = ` [Request original url]: ${request.originalUrl}
  [Method]: ${request.method}
  [IP]: ${request.ip}
  [Status code]: ${status}
  [Response]: ${exception.toString()}`;

    Log4js.error(logFormat);

    response.status(status).json(msg);
  }
}
