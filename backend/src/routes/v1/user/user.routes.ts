import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import UserController from '@controllers/v1/user/user.controllers';
import validateResource from '@middleware/validateResource.middleware';
import { createUserSchema } from './validations/register.validation';

class UserRoute implements IRoute {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, validateResource(createUserSchema), this.userController.createUser);
  }
}

export default UserRoute;
