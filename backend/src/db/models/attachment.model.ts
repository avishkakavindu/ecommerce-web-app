import { Schema, model } from 'mongoose';
import { TAttachmentDocument } from '@db/interfaces/attachment.interface';

const attachmentSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const AttachmentModel = model<TAttachmentDocument>('Attachment', attachmentSchema);

export default AttachmentModel;
