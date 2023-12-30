import { Application } from 'express';
import CommonMiddleware from 'middleware/commonMiddleware';

class InitializeMiddleware {
  public static async initializeCommonMiddleware(app: Application): Promise<void> {
    const middleware = new CommonMiddleware(app);

    await middleware.useBodyParser();
    await middleware.useURLEncoded();
    await middleware.useCors();
    await middleware.logRequests();
  }
}

export default InitializeMiddleware;
