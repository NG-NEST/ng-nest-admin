import { HttpStatus } from '@nestjs/common';

export function StatusCode(str: string) {
  for (let code in HttpStatus) {
    if (HttpStatus[code] === str) {
      return code;
    }
  }
  return str;
}
