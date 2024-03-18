import { LogsSubject } from '@api/core';
import { LogsService, LogsType } from '@api/services';
import { Controller, Sse, MessageEvent, Get, Param } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Sse()
  sse(): Observable<MessageEvent> {
    return LogsSubject.pipe(map((x) => ({ data: x })));
  }

  @Get(':type/:name')
  downloadFile(@Param('type') type: LogsType, @Param('name') name: string) {
    return this.logsService.logStreamableFile(type, name);
  }
}
