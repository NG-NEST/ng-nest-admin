import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export type ContextType = 'http' | 'ws' | 'rpc' | 'graphql';

export const HEADER_REQUEST_DATA = '__requestData';
export const HEADER_RESPONSE_DATA = '__responseData';
export const HEADER_CACHE_DATA = '__cacheData';
export const HEADER_EXCEPTION_DATA = '__exceptionData';
export function StatusCode(str: string) {
  for (let code in HttpStatus) {
    if (HttpStatus[code] === str) {
      return code;
    }
  }
  return str;
}

export function ClearCustomHeaders(req: Request) {
  delete req.headers[HEADER_REQUEST_DATA];
  delete req.headers[HEADER_RESPONSE_DATA];
  delete req.headers[HEADER_CACHE_DATA];
  delete req.headers[HEADER_EXCEPTION_DATA];
}
