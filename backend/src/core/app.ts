import express from 'express';
import { Server, createServer } from 'http';
import winston from 'winston';

import loadEnvVariables, { PORT } from 'configs/envValidator';
import DatabaseConnection from 'configs/dbConnection';
import Logger from 'utils/logger';
import InitializeRoutes from './initializeRoutes';
import InitializeMiddleware from './initializeMiddleware';

class App {
  public app: express.Application;
  public port: string | number;
  public httpServer: Server;
  public dbConnection: DatabaseConnection;
  public logger: winston.Logger;

  constructor() {
    this.app = express();
    this.port = PORT || 4000;
    this.httpServer = createServer(this.app);
    this.app.set('port', this.port);
    this.dbConnection = new DatabaseConnection();

    this.initializeFunctions();
    this.logger = Logger.getLogger();
  }

  private async initializeFunctions(): Promise<void> {
    loadEnvVariables();
    await this.dbConnection.connect();

    await InitializeMiddleware.initializeCommonMiddleware(this.app);
    // initialize routes
    await InitializeRoutes.initialize(this.app);
  }

  public async disconnect(): Promise<void> {
    try {
      await this.dbConnection.disconnect();
      this.logger.info('Database disconnected.');
    } catch (error) {
      this.logger.error(`Error disconnecting from the database: ${error}`);
    }
  }

  public listen(): void {
    this.httpServer.listen(this.app.get('port'), () => {
      const nodeVersion = process.version;
      this.logger.info('==================================================');
      this.logger.info(`= Server up at: http://localhost:${this.port} | ${nodeVersion} =`);
      this.logger.info('==================================================');
    });
  }
}

export default App;
