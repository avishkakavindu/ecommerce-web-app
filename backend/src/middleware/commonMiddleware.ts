import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { CORS_ORIGIN } from 'configs/envValidator';
import Logger from 'utils/logger';
import { handleRequestComplete, handleRequestStart } from './requests';

class CommonMiddleware {
  public app: Application;

  constructor(_app: Application) {
    this.app = _app;
  }

  public async initializeMiddleware(): Promise<void> {
    await this.useBodyParser();
    await this.useCors();
    await this.useHelmet();
    await this.logRequests();
    // Add other middleware initialization here
  }

  public async useBodyParser(): Promise<void> {
    this.app.use(bodyParser.json());
  }

  public async useURLEncoded(): Promise<void> {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
  }

  public async useHelmet(): Promise<void> {
    this.app.use(helmet());
  }

  public async useCors(): Promise<void> {
    this.app.use(cors({ origin: CORS_ORIGIN }));
  }

  public async logRequests(): Promise<void> {
    const logger = Logger.getLogger();

    this.app.use(async (req: Request, res: Response, next: NextFunction) => {
      handleRequestStart(req, logger);
      next();
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      handleRequestComplete(req, res, logger);
      next();
    });
  }
}

export default CommonMiddleware;
