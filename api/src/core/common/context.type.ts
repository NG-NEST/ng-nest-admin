import { HttpStatus, StreamableFile } from '@nestjs/common';
import { Request } from 'express';
import { ReadStream } from 'fs-extra';

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

export function ClearCustomHeaders(...requests: Request[]) {
  for (let req of requests) {
    delete req.headers[HEADER_REQUEST_DATA];
    delete req.headers[HEADER_RESPONSE_DATA];
    delete req.headers[HEADER_CACHE_DATA];
    delete req.headers[HEADER_EXCEPTION_DATA];
  }
}

export function ClearMultipartFiles(...requests: Request[]) {
  for (let req of requests) {
    const body = req.body;
    for (let key in body) {
      const value = body[key];

      if (value instanceof Array) {
        body[key] = value.map((val) => {
          if (val.type === 'file') {
            return extractFileData(val);
          }
          return val;
        });
      } else {
        if (value?.type === 'file') {
          body[key] = extractFileData(value);
        }
      }
    }
  }
}

function extractFileData(file: any): Record<string, any> {
  return {
    fieldname: file.fieldname,
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    encoding: file.encoding,
    path: file.path,
    size: file.size,
  };
}

export function SafeStringify(data: any): string {
  const seen = new WeakSet();
  return JSON.stringify(data, (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }
    if (value instanceof ReadStream || value instanceof StreamableFile) return undefined;
    return value;
  });
}
