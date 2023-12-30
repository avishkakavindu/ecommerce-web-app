import { Express } from 'express-serve-static-core';
import { IRequestUser } from '@interfaces/core.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: IRequestUser;
  }
}
