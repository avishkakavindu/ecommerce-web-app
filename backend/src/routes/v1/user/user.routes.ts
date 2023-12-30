import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import UserController from '@controllers/v1/user/user.controllers';

class UserRoute implements IRoute {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.userController.index);
  }
}

export default UserRoute;
