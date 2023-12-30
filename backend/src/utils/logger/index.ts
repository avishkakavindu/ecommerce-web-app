import winston, { format } from 'winston';

import { CUSTOM_COLORS, CUSTOM_LEVELS, consoleTransport, customTransports, logFormat } from './configs';

class Logger {
  private logger: winston.Logger;
  private static instance: Logger;

  private constructor() {
    // add colors to winston
    winston.addColors(CUSTOM_COLORS);

    this.logger = winston.createLogger({
      levels: CUSTOM_LEVELS,
      transports: [...customTransports, consoleTransport],
      format: format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      exitOnError: false,
    });
  }

  public static getLoggerInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public static getLogger(): winston.Logger {
    const _logger = Logger.getLoggerInstance();
    return _logger.logger;
  }
}

export default Logger;
