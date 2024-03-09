import { HttpStatus } from '@nestjs/common';

export type ContextType = 'http' | 'ws' | 'rpc' | 'graphql';

export function StatusCode(str: string) {
  for (let code in HttpStatus) {
    if (HttpStatus[code] === str) {
      return code;
    }
  }
  return str;
}
