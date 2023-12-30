import { CustomError } from 'exceptions/CustomError';
import { Response } from 'express';

const truncateErrorStack = (stack: string | undefined, maxLength: number): string => {
  if (!stack) return '';
  return stack.length > maxLength ? `${stack.substr(0, maxLength)}...` : stack;
};

export const handleError = (err: Error, res: Response): void => {
  console.error(`ERROR MSG :: ${err?.message}`);
  console.error(`ERROR STACK :: ${truncateErrorStack(err?.stack, 5000)}`);

  // Handled errors
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;
    res.sendStatus(statusCode).json({ errors });
    return;
  }

  // Unhandled errors
  res.sendStatus(500).json({ errors: [{ message: 'Something went wrong' }] });
  return;
};
