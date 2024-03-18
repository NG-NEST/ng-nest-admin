export const LogsI18n = 'logs';

export enum LogsAuth {
  LogsCreate = 'logs-create',
  LogsUpdate = 'logs-update',
  LogsDelete = 'logs-delete',
  LogsDeleteAll = 'logs-delete-all'
}

export enum LogsDescription {
  Logs = 'Logs',

  Error = 'Error',
  Http = 'Http',
  Info = 'Info',
  Cache = 'Cache',
  Prisma = 'Prisma',
  Warn = 'Warn',

  Name = 'Name',
  Type = 'Type',
  Extension = 'Extension'
}

export type LogsType = 'error' | 'http' | 'info' | 'cache' | 'prisma' | 'warn';
