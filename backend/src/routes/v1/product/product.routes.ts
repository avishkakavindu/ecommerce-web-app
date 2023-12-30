import { Router } from 'express';

import { IRoute } from '@interfaces/routes.interface';
import validateResource from '@middleware/validateResource.middleware';
import requireAuth from '@middleware/auth.middleware';
import ProductController from '@controllers/v1/product/product.controllers';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './validations/product.validation';

class ProductRoute implements IRoute {
  public path = '/products';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, requireAuth, validateResource(createProductSchema), this.productController.createProduct);

    this.router.get(`${this.path}/list`, requireAuth, this.productController.createProduct);

    this.router.get(`${this.path}/:id`, requireAuth, validateResource(getProductSchema), this.productController.getProductById);

    this.router.patch(
      `${this.path}/:id`,
      requireAuth,
      validateResource(updateProductSchema),
      this.productController.updateProduct,
    );

    this.router.delete(
      `${this.path}/:id`,
      requireAuth,
      validateResource(deleteProductSchema),
      this.productController.deleteProduct,
    );
  }
}

export default ProductRoute;
