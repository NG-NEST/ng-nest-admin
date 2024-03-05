import { Request } from 'express';

export function getRequestLogs(request: Request) {
  return {
    originUrl: request.originalUrl,
    method: request.method,
    ip: request.ip,
    query: request.query,
    body: request.body,
    headers: request.headers,
  };
}
