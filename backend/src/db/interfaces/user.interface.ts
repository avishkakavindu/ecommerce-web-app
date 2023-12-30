import { Document } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export type TUserDocument = Document & IUser;
