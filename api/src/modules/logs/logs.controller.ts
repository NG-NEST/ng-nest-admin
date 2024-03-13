import { LogsSubject } from '@api/core';
import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Controller('logs')
export class LogsController {
  constructor() {}

  @Sse()
  sse(): Observable<MessageEvent> {
    return LogsSubject.pipe(map((x) => ({ data: x })));
  }
}
