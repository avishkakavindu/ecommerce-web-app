import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import requireAuth from '@middleware/auth.middleware';
import validateResource from '@middleware/validateResource.middleware';
import AttachmentController from '@controllers/v1/attachment/attachment.controller';
import upload from '@utils/attachment/multer';
import { getAttachmentSchema } from './validations/attachment.valiadation';

class AttachmentRoute implements IRoute {
  public path = '/attachments';
  public router = Router();
  public attachmentController = new AttachmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // upload single image
    this.router.post(`${this.path}`, requireAuth, upload.single('image'), this.attachmentController.createAttachment);
    // get image by id
    this.router.get(
      `${this.path}/:id`,
      requireAuth,
      validateResource(getAttachmentSchema),
      this.attachmentController.getAttachment,
    );
  }
}

export default AttachmentRoute;
