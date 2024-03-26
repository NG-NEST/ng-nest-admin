import { Request, Response, NextFunction } from 'express';
import { Logs } from '../config';
import {
  ClearCustomHeaders,
  HEADER_CACHE_DATA,
  HEADER_EXCEPTION_DATA,
  HEADER_REQUEST_DATA,
  HEADER_RESPONSE_DATA,
} from '../common';
import { StreamableFile } from '@nestjs/common';
import { ReadStream } from 'fs-extra';

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();
  res.on('finish', () => {
    const end = process.hrtime(start);
    const exceptionData = req.headers[HEADER_EXCEPTION_DATA] as string;
    if (res.statusCode >= 400 || exceptionData) {
      ClearCustomHeaders(req);
      Logs.error(exceptionData, {
        context: 'ExceptionsFilter',
        ms: `+${(end[1] / 1000000).toFixed(0)}ms`,
      });
      return;
    }
    const cacheData = req.headers[HEADER_CACHE_DATA] as any;
    const request = req.headers[HEADER_REQUEST_DATA] as any;
    if (cacheData) {
      ClearCustomHeaders(req, request);
      const msg = JSON.stringify({ request, response: { ...cacheData } });
      Logs.cache(msg, { context: 'CacheInterceptor', ms: `+${(end[1] / 1000000).toFixed(0)}ms` });
      return;
    }
    let response = req.headers[HEADER_RESPONSE_DATA];
    ClearCustomHeaders(req);
    let msg = '';
    if (response instanceof StreamableFile) {
      const { path, bytesRead } = response['stream'] as ReadStream;
      msg = JSON.stringify({ request, response: { bytesRead, path } });
    } else {
      msg = JSON.stringify({ request, response });
    }

    Logs.http(msg, { context: 'TransformInterceptor', ms: `+${(end[1] / 1000000).toFixed(0)}ms` });
  });
  next();
}
