import { Types } from 'mongoose';
import { object, string, TypeOf } from 'zod';

const params = {
  params: object({
    id: string().refine(val => {
      return Types.ObjectId.isValid(val);
    }, 'Invalid attachment id'),
  }),
};

export const getAttachmentSchema = object({
  ...params,
});

export type TGetAttachmentInput = TypeOf<typeof getAttachmentSchema>;
