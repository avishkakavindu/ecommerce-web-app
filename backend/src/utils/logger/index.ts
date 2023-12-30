import winston from 'winston';

class Logger {
  private logger: winston.Logger;
  private static instance: Logger;

  private constructor() {
    this.logger = winston.createLogger({
      transports: [],
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
