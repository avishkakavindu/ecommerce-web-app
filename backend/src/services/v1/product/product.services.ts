import { TProductDocument } from '@db/interfaces/product.interface';
import { TCreateProductInput, TUpdateProductInput } from '@routes/v1/product/validations/product.validation';
import ProductModel from '@db/models/product.model';
import { RESPONSES } from 'constants/responses';
import HttpException from 'exceptions/httpException';
import { FlattenMaps } from 'mongoose';

class ProductService {
  public async getProductById(id: string): Promise<FlattenMaps<TProductDocument>> {
    const data = await ProductModel.findById(id).lean();

    if (!data) {
      throw new HttpException({
        code: 404,
        message: RESPONSES.RECORD_DOES_NOT_EXIST,
        userMessage: 'Product not found',
      });
    }

    return data;
  }

  // !TODO Add pagination
  public async getProductList(): Promise<FlattenMaps<TProductDocument[]>> {
    const data = await ProductModel.find({}).lean();
    return data;
  }

  public async createProduct(body: TCreateProductInput['body']): Promise<TProductDocument> {
    try {
      const data = await ProductModel.create(body);
      return data;
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // duplicate key error
        throw new HttpException({
          code: 409,
          message: RESPONSES.RECORD_ALREADY_EXISTS,
          userMessage: 'Provided SKU already exists',
        });
      }
      throw error;
    }
  }

  // ! TODO unique key constrain failure need to be handled
  public async updateProduct(id: string, body: TUpdateProductInput['body']): Promise<FlattenMaps<TProductDocument>> {
    const data = await ProductModel.findByIdAndUpdate(id, body, { new: true }).lean();

    if (!data) {
      throw new HttpException({ code: 404, message: RESPONSES.RECORD_DOES_NOT_EXIST, userMessage: 'Product not found' });
    }
    return data;
  }

  public async deleteProduct(id: string): Promise<FlattenMaps<TProductDocument>> {
    const data = await ProductModel.findByIdAndDelete(id).lean();

    if (!data) {
      throw new HttpException({ code: 404, message: RESPONSES.RECORD_DOES_NOT_EXIST, userMessage: 'Product not found' });
    }
    return data;
  }
}

export default ProductService;
