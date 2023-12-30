export interface IProduct {
  sku: string;
  name: string;
  description: string;
  quantity: number;
  mainImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TProductDocument = Document & IProduct;
