import { FlattenMaps } from 'mongoose';

import { TAttachmentDocument } from '@db/interfaces/attachment.interface';
import AttachmentModel from '@db/models/attachment.model';
import HttpException from 'exceptions/httpException';
import { RESPONSES } from 'constants/responses';

class AttachmentService {
  public async createAttachment(attachment: {
    location: string;
    originalName: string;
    mimetype: string;
  }): Promise<TAttachmentDocument> {
    const savedAttachment = await AttachmentModel.create(attachment);
    return savedAttachment;
  }

  public async getAttachment(id: string): Promise<FlattenMaps<TAttachmentDocument>> {
    const attachment = await AttachmentModel.findById(id).lean();
    if (!attachment) {
      throw new HttpException({ code: 404, message: RESPONSES.RECORD_DOES_NOT_EXIST, userMessage: 'Attachment not found' });
    }
    return attachment;
  }
}

export default AttachmentService;
