import { Response, Request } from 'express';
import { AbstractRoute } from '../..';

class TestRoute extends AbstractRoute {
  constructor() {
    super();
    this.path = '/';
    this.InitializeController();
  }

  public async handleGet(req: Request, res: Response): Promise<void> {
    res.status(200).send({ status: 'OK' });
  }
}

export default TestRoute;
