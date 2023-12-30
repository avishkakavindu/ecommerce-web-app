import { Express } from 'express';

import { routes } from '@routes/v1';

class InitializeRoutes {
  public static async Initialize(app: Express): Promise<void> {
    routes.forEach(route => {
      app.use('/', route.router);
    });
  }
}

export default InitializeRoutes;
