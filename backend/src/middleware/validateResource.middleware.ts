import { handleError } from '@utils/errorHandler/errorHandler';
import HttpException from 'exceptions/httpException';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Validate the request body using the schema and un defined data in object will be stripped
 * @param {AnyZodObject} schema - Schema required for validation
 * @returns
 */
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedReqData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validatedReqData?.body || {};
      req.query = validatedReqData?.query || {};
      req.params = validatedReqData?.params || {};

      next();
    } catch (errors: unknown) {
      const errs = errors as ZodError;
      const exception = new HttpException({
        code: 422,
        message: 'VALIDATION_ERROR',
        context: errs.issues,
      });
      handleError(exception, res);
    }
  };

export default validateResource;
