import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import validateResource from '@middleware/validateResource.middleware';
import AuthController from '@controllers/v1/auth/auth.controllers';
import { loginSchema } from './validations/login.validation';
import requireAuth from '@middleware/auth.middleware';

class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/login`, validateResource(loginSchema), this.authController.login);
    this.router.get(`${this.path}/sessions`, requireAuth, this.authController.getSessions);
  }
}

export default AuthRoute;
