import { Schema, model, Types } from 'mongoose';
import { TProductDocument } from '@db/interfaces/product.interface';

const productSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    mainImage: {
      type: Types.ObjectId,
      ref: 'Attachment',
    },
    images: [
      {
        type: Types.ObjectId,
        ref: 'Attachment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ProductModel = model<TProductDocument>('Product', productSchema);

export default ProductModel;
