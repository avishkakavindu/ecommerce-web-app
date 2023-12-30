export interface IAttachment {
  location: string;
  originalName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TAttachmentDocument = Document & IAttachment;
