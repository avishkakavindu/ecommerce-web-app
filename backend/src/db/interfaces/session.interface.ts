import { TUserDocument } from './user.interface';

export interface ISession {
  user: TUserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TSessionDocument = Document & ISession;
