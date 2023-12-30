import IndexRoute from '@routes/index';
import v1Routes from '@routes/v1';
import { Application } from 'express';

const routes = [new IndexRoute(), ...v1Routes];

class InitializeRoutes {
  public static async initialize(app: Application): Promise<void> {
    routes.forEach(route => {
      app.use('/', route.router);
    });
  }
}

export default InitializeRoutes;
