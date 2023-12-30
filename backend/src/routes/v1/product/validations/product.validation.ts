import { Types } from 'mongoose';
import { object, string, TypeOf } from 'zod';

const body = {
  body: object({
    sku: string({ required_error: 'SKU is required' }),
    name: string({ required_error: 'Name is required' }),
    description: string({ required_error: 'Description is required' }).email('Invalid email'),
    quantity: string({ required_error: 'Quantity is required' }).min(6, 'Password too short - should be 6 characters minimum'),
    mainImage: string({ required_error: 'Select thumbnail' }),
  }),
};

const params = {
  params: object({
    id: string().refine(val => {
      return Types.ObjectId.isValid(val);
    }, 'Invalid product id'),
  }),
};

export const createProductSchema = object({
  ...body,
  ...params,
});

export const updateProductSchema = object({
  ...body,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type TGetProductInput = TypeOf<typeof getProductSchema>;
export type TCreateProductInput = TypeOf<typeof createProductSchema>;
export type TUpdateProductInput = TypeOf<typeof updateProductSchema>;
export type TDeleteProductInput = TypeOf<typeof deleteProductSchema>;
