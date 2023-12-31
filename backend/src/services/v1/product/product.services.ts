import { TProductDocument } from '@db/interfaces/product.interface';
import { TCreateProductInput, TUpdateProductInput } from '@routes/v1/product/validations/product.validation';
import ProductModel from '@db/models/product.model';
import { RESPONSES } from 'constants/responses';
import HttpException from 'exceptions/httpException';
import { FlattenMaps } from 'mongoose';

class ProductService {
  /**
   * Get product by Id
   * @param {string} id - Product Id
   * @returns
   */
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
  /**
   * Get product list
   * TODO Add pagination
   * @returns
   */
  public async getProductList(): Promise<FlattenMaps<TProductDocument[]>> {
    const data = await ProductModel.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: 'attachments',
          localField: 'mainImage',
          foreignField: '_id',
          as: 'mainImage',
          pipeline: [
            {
              $project: {
                location: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$mainImage',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return data;
  }

  /**
   * Create product
   * @param { TCreateProductInput['body']} body - Product details
   * @returns
   */
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

  /**
   * Update product by id
   * TODO unique key constrain failure need to be handled
   * @param {string} id - product id
   * @param {TUpdateProductInput['body']} body - Update product payload
   * @returns
   */
  public async updateProduct(id: string, body: TUpdateProductInput['body']): Promise<FlattenMaps<TProductDocument>> {
    const data = await ProductModel.findByIdAndUpdate(id, body, { new: true }).lean();

    if (!data) {
      throw new HttpException({ code: 404, message: RESPONSES.RECORD_DOES_NOT_EXIST, userMessage: 'Product not found' });
    }
    return data;
  }

  /**
   * Delete product by id
   * @param {string} id - Product id
   * @returns
   */
  public async deleteProduct(id: string): Promise<FlattenMaps<TProductDocument>> {
    const data = await ProductModel.findByIdAndDelete(id).lean();

    if (!data) {
      throw new HttpException({ code: 404, message: RESPONSES.RECORD_DOES_NOT_EXIST, userMessage: 'Product not found' });
    }
    return data;
  }
}

export default ProductService;
