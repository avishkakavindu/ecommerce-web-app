import { Schema, model, Types } from 'mongoose';
import { TSessionDocument } from '@db/interfaces/session.interface';

const sessionSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      // browser details
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const SessionModel = model<TSessionDocument>('Session', sessionSchema);

export default SessionModel;
