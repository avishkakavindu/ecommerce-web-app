export interface IProduct {
  sku: string;
  name: string;
  description: string;
  quantity: number;
  mainImage: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TProductDocument = Document & IProduct;
