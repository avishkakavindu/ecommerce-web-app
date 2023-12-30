import express from 'express';

import { PORT } from 'configs/envValidator';
import { createServer } from 'http';

class App {
  public app: express.Application;
  public port: string | number;
  public httpServer: any;

  constructor() {
    this.app = express();
    this.port = PORT || 4000;
    this.httpServer = createServer(this.app);
    this.app.set('port', this.port);
  }

  public listen(): void {
    this.httpServer.listen(this.app.get('port'), () => {
      const nodeVersion = process.version;
      console.log('=======================================================');
      console.log(`= Server started at: http://localhost:${this.port} | ${nodeVersion} =`);
      console.log('=======================================================');
    });
  }
}

export default App;