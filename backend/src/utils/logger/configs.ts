import fs from 'fs';
import path from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import { LOG_DIR, LOG_DATE_PATTERN, LOG_FILE_NAME_PATTERN } from 'configs/envValidator';

// root dir
const logDir = path.join(__dirname, `../../../${LOG_DIR}`);

// if log dir doesn't exists create a one
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const CUSTOM_LEVELS = {
  error: 0, // most critical errors
  warn: 1, // warnings
  info: 2, // informational messages
  http: 3, // HTTP requests and responses
  debug: 4, // detailed debugging information
  trace: 5, // most detailed tracing information
};

const LOG_LEVELS = {
  info: 'info',
  error: 'error',
  debug: 'debug',
  warn: 'warn',
  http: 'http',
  trace: 'trace',
};

export const CUSTOM_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'green',
  trace: 'blue',
};

const commonTransportConfigs = {
  datePattern: LOG_DATE_PATTERN,
  filename: LOG_FILE_NAME_PATTERN,
  maxFiles: 14,
  json: true,
  zippedArchive: true,
};

export const customTransports: winstonDaily[] = [
  // info log configs
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.info,
    dirname: `${logDir}/${LOG_LEVELS.info}`,
  }),
  // error log cponfigs
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.error,
    dirname: `${logDir}/${LOG_LEVELS.error}`,
    handleExceptions: true, // uncaught exceptions should be caught and logged
  }),
  // debug log configs
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.debug,
    dirname: `${logDir}/${LOG_LEVELS.debug}`,
  }),
  // warn log configs
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.warn,
    dirname: `${logDir}/${LOG_LEVELS.warn}`,
  }),
  // http log config
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.http,
    dirname: `${logDir}/${LOG_LEVELS.http}`,
  }),
  // trace log configs - custom level detailed
  new winstonDaily({
    ...commonTransportConfigs,
    level: LOG_LEVELS.trace,
    dirname: `${logDir}/${LOG_LEVELS.trace}`,
    format: winston.format.combine(winston.format.errors({ stack: true })),
  }),
];

// Console transport
export const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.splat(), winston.format.colorize({ all: true })),
});

export const logFormat = winston.format.printf(info => {
  const { timestamp, level, message } = info;
  return `${timestamp} ${level}: ${message}`;
});
