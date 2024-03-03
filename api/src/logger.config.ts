import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const format = (label?: string) => {
  switch (label) {
    case 'isDev':
      return {
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('NEST', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      };
    default:
      return {
        format: winston.format.combine(winston.format.timestamp(), winston.format.ms()),
      };
  }
};
const prodLoggerConfig = [
  new DailyRotateFile({
    level: 'warn',
    filename: 'warn-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
    zippedArchive: true,
    ...format(),
  }),
  new DailyRotateFile({
    level: 'info',
    filename: 'info-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
    zippedArchive: true,
    ...format(),
  }),
];

export const loggerOptions: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: 'info',
      ...format('isDev'),
    }),
    ...prodLoggerConfig,
  ],
};
