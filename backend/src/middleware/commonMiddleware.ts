import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import onFinished from 'on-finished';
import helmet from 'helmet';
import winston from 'winston';

import { CORS_ORIGIN } from 'configs/envValidator';
import Logger from 'utils/logger';
import { handleRequestComplete, handleRequestStart } from './requests';

class CommonMiddleware {
  public app: Application;
  public logger: winston.Logger;

  constructor(_app: Application) {
    this.app = _app;
    this.logger = Logger.getLogger();
  }

  public initializeMiddleware(): void {
    this.useBodyParser();
    this.useCors();
    this.useHelmet();
    // this.logRequests();
    // Add other middleware initialization here
  }

  public useBodyParser(): void {
    this.app.use(bodyParser.json());
  }

  public useURLEncoded(): void {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
  }

  public useHelmet(): void {
    this.app.use(helmet());
  }

  public useCors(): void {
    this.app.use(cors({ origin: CORS_ORIGIN }));
  }

  public logRequests(): void {
    this.app.use('/*', async (req: Request, res: Response, next: NextFunction) => {
      handleRequestStart(req, this.logger);
      next();

      onFinished(res, _err => {
        handleRequestComplete(req, res, this.logger);
      });
    });
  }
}

export default CommonMiddleware;
