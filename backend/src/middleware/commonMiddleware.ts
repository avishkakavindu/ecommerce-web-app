import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

class CommonMiddleware {
  public app: Application;

  constructor(_app: Application) {
    this.app = _app;
  }

  public async useBodyParser(): Promise<void> {
    this.app.use(bodyParser.json());
  }

  public async useURLEncoded(): Promise<void> {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
  }

  public async useCors(): Promise<void> {
    this.app.use(cors());
  }

  public async logRequests(): Promise<void> {
    // TODO implement proper logger
    this.app.use((req, res, done) => {
      console.log('Request to ', req.originalUrl);
      done();
    });
  }
}

export default CommonMiddleware;
