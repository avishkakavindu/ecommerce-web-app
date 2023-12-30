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
      res.status(400).json(errs.issues);
    }
  };

export default validateResource;
