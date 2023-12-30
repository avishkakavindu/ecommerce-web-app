import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import validateResource from '@middleware/validateResource';
import AuthController from '@controllers/v1/auth/auth.controllers';
import { loginSchema } from './validations/login.validation';

class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/login`, validateResource(loginSchema), this.authController.login);
  }
}

export default AuthRoute;
