import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import IndexController from '@controllers/index';

class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
