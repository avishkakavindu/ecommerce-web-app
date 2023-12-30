import { Response, Request } from 'express';

import { handleError } from '@utils/errorHandler/errorHandler';
import AttachmentService from '@services/v1/attachment/attachment.services';
import HttpException from 'exceptions/httpException';
import { RESPONSES } from 'constants/responses';

class AttachmentController {
  private attachmentService = new AttachmentService();

  public createAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { originalname, destination, filename, mimetype, size } = req.file as Express.Multer.File;
      const maxFileSize = 50 * 1024 * 1024; // 50 MB in bytes

      if (size > maxFileSize) {
        new HttpException({ code: 422, message: RESPONSES.FILE_SIZE_EXCEEDED, userMessage: 'File size exceeds limit' });
      }
      const attachment = {
        location: `${destination}${filename}`,
        originalName: originalname,
        mimetype,
      };
      const data = await this.attachmentService.createAttachment(attachment);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  public getAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.attachmentService.getAttachment(id);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };
}

export default AttachmentController;
