import { Application } from 'express';

import { routes } from '@routes/v1';

class InitializeRoutes {
  public static async initialize(app: Application): Promise<void> {
    routes.forEach(route => {
      app.use('/', route.router);
    });
  }
}

export default InitializeRoutes;
