import { CustomError } from 'exceptions/CustomError';
import { Response } from 'express';

export const handleError = (err: Error, res: Response): void => {
  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2,
        ),
      );
    }

    res.status(statusCode).json({ errors });
  }

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  res.status(500).json({ errors: [{ message: 'Something went wrong' }] });
};
