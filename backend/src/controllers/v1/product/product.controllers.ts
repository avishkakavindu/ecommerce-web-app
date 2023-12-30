import { Response, Request } from 'express';

import {
  TCreateProductInput,
  TDeleteProductInput,
  TGetProductInput,
  TUpdateProductInput,
} from '@routes/v1/product/validations/product.validation';
import ProductService from '@services/v1/product/product.services';
import { handleError } from '@utils/errorHandler/errorHandler';

class ProductController {
  private productService = new ProductService();

  /**
   * Create product
   * @param req - Request
   * @param res - Response
   */
  public createProduct = async (req: Request<{}, {}, TCreateProductInput['body']>, res: Response): Promise<void> => {
    try {
      const { body } = req;
      const data = await this.productService.createProduct(body);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  /**
   * Get product by Id
   * @param req - Request
   * @param res - Response
   */
  public getProductById = async (req: Request<TGetProductInput['params'], {}, {}>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.productService.getProductById(id);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  /**
   * Get product list
   * TODO add pagination
   * @param req - Request
   * @param res - Response
   */
  public getProductList = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.productService.getProductList();
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  /**
   * Update product by id
   * @param req - Request
   * @param res - Response
   */
  public updateProduct = async (
    req: Request<TUpdateProductInput['params'], {}, TUpdateProductInput['body']>,
    res: Response,
  ): Promise<void> => {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.productService.updateProduct(id, body);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  /**
   * Delete product by Id
   * @param req - Request
   * @param res - Response
   */
  public deleteProduct = async (req: Request<TDeleteProductInput['params'], {}, {}>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.productService.deleteProduct(id);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };
}

export default ProductController;
