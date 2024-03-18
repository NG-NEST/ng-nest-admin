import { LogsFile } from './logs-file.model';

export class LogsOutput {
  error?: LogsFile[];
  http?: LogsFile[];
  info?: LogsFile[];
  cache?: LogsFile[];
  prisma?: LogsFile[];
  warn?: LogsFile[];
}
