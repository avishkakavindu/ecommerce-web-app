import { Application } from 'express';
import CommonMiddleware from 'middleware/commonMiddleware';

class InitializeMiddleware {
  public static async initializeCommonMiddleware(app: Application): Promise<void> {
    const middleware = new CommonMiddleware(app);

    middleware.initializeMiddleware();
  }
}

export default InitializeMiddleware;
