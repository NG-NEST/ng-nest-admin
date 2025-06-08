import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Request } from 'express';
import { Subject } from 'rxjs';

const clc = {
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  cyan: (text: string) => `\x1B[36m${text}\x1B[39m`,
};

const levelColors: Record<string, (text: string) => string> = {
  error: clc.red,
  warn: clc.yellow,
  info: clc.green,
  cache: clc.cyan,
  http: clc.cyan,
  prisma: clc.cyan,
};

type LoggerType = {
  error: (msg: string, params?: LoggerParams) => void;
  warn: (msg: string, params?: LoggerParams) => void;
  info: (msg: string, params?: LoggerParams) => void;
  cache: (msg: string, params?: LoggerParams) => void;
  http: (msg: string, params?: LoggerParams) => void;
  prisma: (msg: string, params?: LoggerParams) => void;
};

type LoggerParams = {
  context?: string;
  ms?: string;
  stack?: string;
  timestamp?: string;
  [key: string]: any;
};

type LoggerExtendMethod = {
  cache: winston.LeveledLogMethod;
  prisma: winston.LeveledLogMethod;
};

const dailyFormat = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.splat(),
    winston.format.printf((info) => {
      LOGGER_CONSOLE.info(info.message as string, info);
      return JSON.stringify(info);
    }),
  ),
};

const consoleFormat = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.splat(),
    winston.format.printf((info) => {
      let { context, level, timestamp, message, ms } = info;
      LOGS_SUBJECT.next(info);
      if (timestamp) {
        try {
          if (timestamp === new Date(timestamp as number).toISOString()) {
            timestamp = new Date(timestamp).toLocaleString();
          }
        } catch (error) {}
      }
      const color = levelColors[level];
      const yellow = clc.yellow;
      const name = 'NEST';
      const res =
        color(`[${name}]`) +
        ` ${yellow(`${level.toUpperCase().padEnd(8)}`)}` +
        (timestamp ? ` ${timestamp}` : '') +
        (context ? ` ${yellow(`[${context}]`)}` : '') +
        ` ${color(message as string)}` +
        (ms ? ` ${yellow(ms as string)}` : '');

      return res;
    }),
  ),
};

function winstonConsole(level: string) {
  return new winston.transports.Console({
    level,
    ...consoleFormat,
  });
}

function dailyRotateFile(level: string) {
  return new DailyRotateFile({
    level,
    filename: `%DATE%.log`,
    dirname: `logs/${level}`,
    datePattern: 'YYYY-MM-DD HH',
    maxSize: '20m',
    maxFiles: '30d',
    zippedArchive: true,
    ...dailyFormat,
  });
}

function winstonLogger(level: string) {
  const levels = { [`${level}`]: 0 };
  const transports: winston.transport[] = [dailyRotateFile(level)];
  return winston.createLogger({
    level,
    levels,
    transports,
  }) as winston.Logger & LoggerExtendMethod;
}

const loggerDailyOptions: winston.LoggerOptions = {
  level: 'info',
  transports: dailyRotateFile('info'),
};

const loggerConsoleOptions: winston.LoggerOptions = {
  level: 'info',
  transports: winstonConsole('info'),
};

const LoggerError = winstonLogger('error');
const LoggerWarn = winstonLogger('warn');
const LoggerInfo = winstonLogger('info');
const LoggerCache = winstonLogger('cache');
const LoggerHttp = winstonLogger('http');
const LoggerPrisma = winstonLogger('prisma');

export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  cache: 3,
  http: 4,
  prisma: 5,
};

export function getRequestLogs(request: Request) {
  return {
    originUrl: request.originalUrl,
    method: request.method,
    ip: request.ip,
    query: request.query,
    body: request.body,
    headers: { ...request.headers },
  };
}

export const LOGGER_INSTANCE = winston.createLogger(loggerDailyOptions);
export const LOGGER_CONSOLE = winston.createLogger(loggerConsoleOptions);

export const LOGS_SUBJECT = new Subject<winston.Logform.TransformableInfo>();

export const LOGS: LoggerType = {
  error: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerError.error(msg, { ...params });
  },
  warn: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerWarn.warn(msg, { ...params });
  },
  info: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerInfo.info(msg, { ...params });
  },
  cache: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerCache.cache(msg, { ...params });
  },
  http: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerHttp.http(msg, { ...params });
  },
  prisma: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerPrisma.prisma(msg, { ...params });
  },
};
