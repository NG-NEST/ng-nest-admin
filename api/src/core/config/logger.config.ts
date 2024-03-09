import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Request } from 'express';

const format = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.ms()),
};

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
  http: clc.cyan,
  prisma: clc.cyan,
};

type LoggerType = {
  error: (msg: string, params?: LoggerParams) => void;
  warn: (msg: string, params?: LoggerParams) => void;
  info: (msg: string, params?: LoggerParams) => void;
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
  prisma: winston.LeveledLogMethod;
};

const customFormat = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.printf((info) => {
      let { context, level, timestamp, message, ms } = info;
      if (timestamp) {
        try {
          if (timestamp === new Date(timestamp).toISOString()) {
            timestamp = new Date(timestamp).toLocaleString();
          }
        } catch (error) {}
      }
      const color = levelColors[level];
      const yellow = clc.yellow;
      const name = 'NEST';
      return (
        color(`[${name}]`) +
        ` ${yellow(`${level.toUpperCase().padEnd(8)}`)}` +
        (timestamp ? ` ${timestamp}` : '') +
        (context ? ` ${yellow(`[${context}]`)}` : '') +
        ` ${color(message)}` +
        (ms ? ` ${yellow(ms)}` : '')
      );
    }),
  ),
};

function winstonConsole(level: string) {
  return new winston.transports.Console({
    level,
    ...customFormat,
  });
}

function dailyRotateFile(level: string) {
  return new DailyRotateFile({
    level,
    utc: true,
    filename: `${level}-%DATE%.log`,
    dirname: `logs/${level}`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
    zippedArchive: true,
    ...format,
  });
}

function winstonLogger(level: string) {
  const levels = { [`${level}`]: 0 };
  const transports: winston.transport[] = [winstonConsole(level), dailyRotateFile(level)];
  if (level !== 'info') {
    levels['info'] = 1;
    transports.push(dailyRotateFile('info'));
  }
  return winston.createLogger({
    level,
    levels,
    transports,
  }) as winston.Logger & LoggerExtendMethod;
}

const loggerOptions: winston.LoggerOptions = {
  transports: [winstonConsole('info'), dailyRotateFile('info')],
};

const LoggerError = winstonLogger('error');
const LoggerWarn = winstonLogger('warn');
const LoggerInfo = winstonLogger('info');
const LoggerHttp = winstonLogger('http');
const LoggerPrisma = winstonLogger('prisma');

export const loggerLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  prisma: 4,
};

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

export const LoggerInstance = winston.createLogger(loggerOptions);

export const Logs: LoggerType = {
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
  http: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerHttp.http(msg, { ...params });
  },
  prisma: (msg: string, params?: LoggerParams) => {
    params.timestamp = params.timestamp || new Date().toISOString();
    LoggerPrisma.prisma(msg, { ...params });
  },
};
