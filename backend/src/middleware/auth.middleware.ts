import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

import { verifyJwt } from '@utils/auth/jwt';
import HttpException from 'exceptions/httpException';
import { RESPONSES } from 'constants/responses';
import { handleError } from '@utils/errorHandler/errorHandler';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    const error = new HttpException({
      code: 409,
      message: RESPONSES.AUTHENTICATION_FAILED,
      userMessage: 'User not authenticated',
    });
    handleError(error, res);
  }

  return next();
};

export default requireAuth;
