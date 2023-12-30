import { ERROR_CODES } from 'constants/errors';
import { Request, Response } from 'express';
import winston from 'winston';

export const handleRequestStart = (req: Request, logger: winston.Logger): void => {
  try {
    const remoteAddress = req.headers['x-forwarded-for'] || req?.connection?.remoteAddress || null;

    logger.info(`New Request | ${req.originalUrl} | METHOD : ${req.method} | IP : ${remoteAddress}`);
  } catch (e) {
    console.error(e);
  }
};

export const handleRequestComplete = (req: Request, res: Response, logger: winston.Logger): void => {
  try {
    if (res.statusCode === 403) {
      logger.warn(`Request Completed | ${res.req.originalUrl || ''} | METHOD : ${res.req.method} | STATUS : ${res.statusCode}`);
    } else if (res.statusCode === 401) {
      logger.warn(`Request Completed | ${res.req.originalUrl || ''} | METHOD : ${res.req.method} | STATUS : ${res.statusCode}`);
    } else if (ERROR_CODES.includes(res.statusCode)) {
      logger.error(`Request Completed | ${res.req.originalUrl || ''} | METHOD : ${res.req.method} | STATUS : ${res.statusCode}`);
    } else {
      logger.info(`Request Completed | ${res.req.originalUrl || ''} | METHOD : ${res.req.method} | STATUS : ${res.statusCode}`);
    }
  } catch (e) {
    console.error(e);
  }
};
