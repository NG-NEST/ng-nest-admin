import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

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
  prisma: clc.cyan,
};

export const loggerLevels = {
  error: 0,
  warn: 1,
  info: 2,
  prisma: 3,
};

type LoggerType = {
  error: (msg: any, context?: any) => void;
  warn: (msg: any, context?: any) => void;
  info: (msg: any, context?: any) => void;
  prisma: (msg: any, context?: any) => void;
};

const customFormat = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.printf(({ context, level, timestamp, message, ms }) => {
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

const LoggerError = winston.createLogger({
  level: 'error',
  levels: { error: 0 },
  transports: [
    new winston.transports.Console({
      level: 'error',
      ...customFormat,
    }),
    new DailyRotateFile({
      level: 'error',
      utc: true,
      filename: 'error-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      zippedArchive: true,
      ...format,
    }),
  ],
});
const LoggerWarn = winston.createLogger({
  level: 'warn',
  levels: { warn: 0 },
  transports: [
    new winston.transports.Console({
      level: 'warn',
      ...customFormat,
    }),
    new DailyRotateFile({
      level: 'warn',
      utc: true,
      filename: 'warn-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      zippedArchive: true,
      ...format,
    }),
  ],
});
const LoggerInfo = winston.createLogger({
  level: 'info',
  levels: { info: 0 },
  transports: [
    new winston.transports.Console({
      level: 'info',
      ...customFormat,
    }),
    new DailyRotateFile({
      level: 'info',
      utc: true,
      filename: 'info-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      zippedArchive: true,
      ...format,
    }),
  ],
});
const LoggerPrisma = winston.createLogger({
  level: 'prisma',
  levels: { prisma: 0 },
  transports: [
    new DailyRotateFile({
      level: 'prisma',
      utc: true,
      filename: 'prisma-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      zippedArchive: true,
      ...format,
    }),
  ],
}) as winston.Logger & { prisma: winston.LeveledLogMethod };

const loggerOptions: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: 'info',
      ...customFormat,
    }),
  ],
};

export const LoggerInstance = winston.createLogger(loggerOptions);

export const Logs: LoggerType = {
  error: (msg: string, context?: string) => {
    LoggerError.error(msg, { context });
  },
  warn: (msg: string, context?: string) => {
    LoggerWarn.warn(msg, { context });
  },
  info: (msg: string, context?: string) => {
    LoggerInfo.info(msg, { context });
  },
  prisma: (msg: string, context?: string) => {
    LoggerPrisma.prisma(msg, { context });
  },
};
