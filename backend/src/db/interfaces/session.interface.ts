import { TUserDocument } from './user.interface';

export interface ISession {
  user: TUserDocument['_id'];
  isValid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TSessionDocument = Document & ISession;
