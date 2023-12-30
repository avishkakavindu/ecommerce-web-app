import express from 'express';

export abstract class AbstractRoute {
  router = express.Router();
  path!: string;

  public async InitializeController(): Promise<void> {
    await this.InitializeGet();
    await this.InitializePost();
    await this.InitializePut();
    await this.InitializePatch();
    await this.InitializeDelete();
  }

  public async handleGet(req: express.Request, res: express.Response): Promise<void> {
    res.send('GET request handled for ' + this.path);
  }

  public async handlePost(req: express.Request, res: express.Response): Promise<void> {
    res.send('POST request handled for ' + this.path);
  }

  public async handlePut(req: express.Request, res: express.Response): Promise<void> {
    res.send('PUT request handled for ' + this.path);
  }

  public async handlePatch(req: express.Request, res: express.Response): Promise<void> {
    res.send('PATCH request handled for ' + this.path);
  }

  public async handleDelete(req: express.Request, res: express.Response): Promise<void> {
    res.send('DELETE request handled for ' + this.path);
  }

  public async InitializeGet(): Promise<void> {
    this.router.get(this.path, this.handleGet.bind(this));
  }

  public async InitializePost(): Promise<void> {
    this.router.post(this.path, this.handlePost.bind(this));
  }

  public async InitializePut(): Promise<void> {
    this.router.put(this.path, this.handlePut.bind(this));
  }

  public async InitializePatch(): Promise<void> {
    this.router.put(this.path, this.handlePut.bind(this));
  }

  public async InitializeDelete(): Promise<void> {
    this.router.delete(this.path, this.handleDelete.bind(this));
  }
}
