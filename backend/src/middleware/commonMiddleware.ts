import express, { Application, NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import cors from 'cors';
import onFinished from 'on-finished';
import helmet from 'helmet';
import winston from 'winston';

import { IRequestUser } from '@interfaces/core.interface';
import { CORS_ORIGIN } from 'configs/envValidator';
import Logger from 'utils/logger';
import { handleRequestComplete, handleRequestStart } from './requests';
import { verifyJwt } from '@utils/auth/jwt';
import AuthService from '@services/v1/auth/auth.services';

class CommonMiddleware {
  public app: Application;
  public logger: winston.Logger;

  constructor(_app: Application) {
    this.app = _app;
    this.logger = Logger.getLogger();
  }

  public initializeMiddleware(): void {
    this.useBodyParser();
    this.useURLEncoded();
    this.useCors();
    this.deserializeUser();
    this.useHelmet();
    this.logRequests();
    // Add other middleware initialization here
  }

  public useBodyParser(): void {
    this.app.use(express.json());
  }

  public useURLEncoded(): void {
    this.app.use(express.urlencoded({ extended: true }));
  }

  public useHelmet(): void {
    this.app.use(helmet());
  }

  public useCors(): void {
    this.app.use(cors({ origin: CORS_ORIGIN }));
  }

  public deserializeUser(): void {
    this.app.use(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
      const refreshToken = get(req, 'headers.x-refresh') as string;

      if (!accessToken) {
        return next();
      }

      const { decoded, expired } = await verifyJwt(accessToken);

      if (decoded) {
        req.user = decoded as IRequestUser;
        return next();
      }

      if (expired && refreshToken) {
        const authServices = new AuthService();
        const newAccessToken = await authServices.reIssueAccessToken(refreshToken);

        if (newAccessToken) {
          res.setHeader('x-access-token', newAccessToken as string);
        }

        const result = await verifyJwt(newAccessToken as string);
        req.user = result.decoded as IRequestUser;
        return next();
      }

      return next();
    });
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
